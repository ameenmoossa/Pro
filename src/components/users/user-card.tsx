"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { User } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserCard({ 
  user, 
  onEdit, 
  onDelete 
}: { 
  user: User; 
  onEdit: (u: User) => void; 
  onDelete: (id: string) => void;
}) {
  return (
    <Card className="hover:shadow-lg transition-all border-border relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-16 bg-primary/5"></div>
      <CardHeader className="flex flex-row items-start justify-between pb-2 relative z-10 pt-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-4 border-background shadow-sm">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="text-xl bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-8 w-8 p-0 bg-background/50 hover:bg-background/80 rounded-full">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(user)}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(user.id)} className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-2 relative z-10">
        <div className="space-y-1">
          <h3 className="font-bold text-lg">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Badge 
            variant="outline" 
            className={
              user.role === "ADMIN" ? "bg-red-500/10 text-red-500 border-0" :
              user.role === "MANAGER" ? "bg-blue-500/10 text-blue-500 border-0" :
              "bg-emerald-500/10 text-emerald-500 border-0"
            }
          >
            {user.role}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
