import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Briefcase, CheckSquare, Database, FileText, Lightbulb, Search, Settings, LogOut } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getWorkspaceSummary } from "@/lib/workspace.functions";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchSummary = useServerFn(getWorkspaceSummary);
  const { data } = useQuery({
    queryKey: ["workspace-summary"],
    queryFn: () => fetchSummary(),
    retry: false,
  });

  const main = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, count: undefined as number | undefined },
    { title: "Projects", url: "/projects", icon: Briefcase, count: data?.counts.projects },
    { title: "Tasks", url: "/tasks", icon: CheckSquare, count: data?.openTasks },
    { title: "Assets", url: "/assets", icon: Database, count: data?.counts.assets },
    { title: "Notes", url: "/notes", icon: FileText, count: data?.counts.notes },
    { title: "Lessons", url: "/lessons", icon: Lightbulb, count: data?.counts.lessons },
    { title: "Search", url: "/search", icon: Search, count: undefined },
  ];

  const handleLogout = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-1.5 font-semibold">
          <div className="h-7 w-7 rounded-md bg-primary" />
          <span>Freelancer's Portal</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span className="flex-1">{item.title}</span>
                      {typeof item.count === "number" && (
                        <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings"}>
              <Link to="/settings"><Settings /><span>Settings</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut /><span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}