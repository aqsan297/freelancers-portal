import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatusBadge } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getWorkspaceSummary } from "@/lib/workspace.functions";
import { Briefcase, CheckSquare, Database, Lightbulb, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Freelancer's Portal" }] }),
  component: Dashboard,
});

function Dashboard() {
  const fetchSummary = useServerFn(getWorkspaceSummary);
  const { data, isLoading, error } = useQuery({
    queryKey: ["workspace-summary"],
    queryFn: () => fetchSummary(),
    retry: false,
  });

  const stats = [
    { label: "Active projects", value: data?.activeProjects.length ?? 0, icon: Briefcase },
    { label: "Open tasks", value: data?.openTasks ?? 0, icon: CheckSquare },
    { label: "Assets", value: data?.counts.assets ?? 0, icon: Database },
    { label: "Lessons logged", value: data?.counts.lessons ?? 0, icon: Lightbulb },
  ];
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Snapshot of your work and recent activity."
        actions={<Button><Plus className="mr-2 h-4 w-4" />New project</Button>}
      />
      {error && (
        <Card className="mb-4 border-destructive/40">
          <CardContent className="p-4 text-sm text-muted-foreground">
            Couldn't load your workspace. Make sure you're signed in.
          </CardContent>
        </Card>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-lg bg-primary/10 p-2.5 text-primary"><s.icon className="h-5 w-5" /></div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                {isLoading ? (
                  <Skeleton className="h-7 w-10" />
                ) : (
                  <p className="text-2xl font-bold">{s.value}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active projects</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link to="/projects">View all</Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading && (
              <>
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </>
            )}
            {!isLoading && data?.activeProjects.length === 0 && (
              <p className="text-sm text-muted-foreground">No active projects yet.</p>
            )}
            {data?.activeProjects.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.client_name ?? "No client"} · updated {new Date(p.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={p.status ?? "active"} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent tasks</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {isLoading && <Skeleton className="h-20 w-full" />}
            {!isLoading && (data?.recentTasks.length ?? 0) === 0 && (
              <p className="text-sm text-muted-foreground">No tasks yet.</p>
            )}
            {data?.recentTasks.map((t) => (
              <div key={t.id} className="text-sm">
                <p className="font-medium">{t.title}</p>
                <p className="text-xs text-muted-foreground">
                  {t.status ?? "todo"} · updated {new Date(t.updated_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}