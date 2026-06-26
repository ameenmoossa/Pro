"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Project } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function ProjectCard({ 
  project, 
  onEdit, 
  onDelete 
}: { 
  project: Project; 
  onEdit: (p: Project) => void; 
  onDelete: (id: string) => void;
}) {
  return (
    <Card className="hover:shadow-lg transition-all border-border h-full flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
        <div className="space-y-1.5 pr-4">
          <CardTitle className="text-lg font-bold">{project.name}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm">{project.description}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 shrink-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(project)}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(project.id)} className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1 mt-4">
        <Badge 
          variant={
            project.status === "ACTIVE" 
              ? "default" 
              : project.status === "COMPLETED" 
                ? "secondary" 
                : "outline"
          }
          className={
            project.status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 shadow-none border-0" :
            project.status === "COMPLETED" ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 shadow-none border-0" :
            "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 shadow-none border-0"
          }
        >
          {project.status}
        </Badge>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-4 border-t">
        Created on {new Date(project.createdAt).toLocaleDateString()}
      </CardFooter>
    </Card>
  );
}
