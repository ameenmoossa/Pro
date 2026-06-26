"use client";

import { useQuery } from "@tanstack/react-query";
import { 
  Briefcase, 
  CheckCircle2, 
  CircleDashed, 
  ListTodo, 
  Users 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { projectsService } from "@/services/projects";
import { tasksService } from "@/services/tasks";
import { usersService } from "@/services/users";

export default function DashboardPage() {
  const { data: projectsData, isLoading: isLoadingProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectsService.getProjects(),
  });

  const { data: tasksData, isLoading: isLoadingTasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => tasksService.getTasks(),
  });

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => usersService.getUsers(),
  });

  const isLoading = isLoadingProjects || isLoadingTasks || isLoadingUsers;

  const stats = [
    {
      title: "Total Projects",
      value: projectsData?.total || projectsData?.data?.length || 0,
      icon: Briefcase,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Tasks",
      value: tasksData?.total || tasksData?.data?.length || 0,
      icon: ListTodo,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Completed Tasks",
      value: tasksData?.data?.filter((t: any) => t.status === "DONE").length || 0,
      icon: CheckCircle2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Pending Tasks",
      value: tasksData?.data?.filter((t: any) => t.status !== "DONE").length || 0,
      icon: CircleDashed,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Developers",
      value: usersData?.total || usersData?.data?.length || 0,
      icon: Users,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Here's an overview of your projects and tasks.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
          >
            <Card className="border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group h-full">
              <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bgColor} rounded-full blur-[50px] -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-semibold text-muted-foreground/80">
                  {stat.title}
                </CardTitle>
                <div className={`p-2.5 rounded-xl ${stat.bgColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                {isLoading ? (
                  <Skeleton className="h-10 w-20 mt-1" />
                ) : (
                  <div className="text-4xl font-black tracking-tight">{stat.value}</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="col-span-1 border-border/60 shadow-lg bg-gradient-to-br from-card to-card/50 overflow-hidden h-full">
            <CardHeader className="border-b border-border/40 bg-muted/20 backdrop-blur-md">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Recent Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoadingProjects ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
              ) : projectsData?.data?.length ? (
                <div className="divide-y divide-border/40">
                  {projectsData.data.slice(0, 5).map((project: any) => (
                    <div key={project.id} className="p-4 hover:bg-muted/10 transition-colors flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-base">{project.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                      </div>
                      <Badge variant={project.status === 'ACTIVE' ? 'default' : project.status === 'COMPLETED' ? 'secondary' : 'outline'} className="ml-4 shrink-0">
                        {project.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Briefcase className="h-8 w-8 opacity-50" />
                  </div>
                  <h3 className="text-lg font-bold">No projects found</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-[250px]">Get started by creating a new project in the Projects tab.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="col-span-1 border-border/60 shadow-lg bg-gradient-to-bl from-card to-card/50 overflow-hidden h-full">
            <CardHeader className="border-b border-border/40 bg-muted/20 backdrop-blur-md">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <ListTodo className="h-5 w-5 text-primary" />
                Recent Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoadingTasks ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
              ) : tasksData?.data?.length ? (
                <div className="divide-y divide-border/40">
                  {tasksData.data.slice(0, 5).map((task: any) => (
                    <div key={task.id} className="p-4 hover:bg-muted/10 transition-colors flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-base line-clamp-1">{task.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-2 h-2 rounded-full ${task.priority === 'HIGH' ? 'bg-destructive' : task.priority === 'MEDIUM' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                          <span className="text-xs text-muted-foreground">{task.priority} Priority</span>
                        </div>
                      </div>
                      <Badge variant={task.status === 'DONE' ? 'default' : 'secondary'} className="ml-4 shrink-0">
                        {task.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <ListTodo className="h-8 w-8 opacity-50" />
                  </div>
                  <h3 className="text-lg font-bold">No tasks found</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-[250px]">Your pending and completed tasks will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
