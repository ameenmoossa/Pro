"use client";
import { useEffect, useState } from "react";
import { Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Topbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [query, setQuery] = useState(initialSearch);

  useEffect(() => {
    setQuery(initialSearch);
  }, [initialSearch]);

  const setSearchQuery = (value: string) => {
    setQuery(value);
    const queryString = value ? `?search=${encodeURIComponent(value)}` : "";
    let targetPath = pathname;

    if (!pathname.startsWith("/projects") && !pathname.startsWith("/tasks") && !pathname.startsWith("/users")) {
      targetPath = "/tasks";
    }

    router.replace(`${targetPath}${queryString}`);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-6 transition-all duration-300">
      <SidebarTrigger />
      <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] rounded-full bg-muted/50 transition-colors focus-visible:bg-background"
            />
          </div>
        </form>
        <ThemeToggle />
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer border-none bg-transparent p-0">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src={user?.avatarUrl} alt={user?.name || "User"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.name || "My Account"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
