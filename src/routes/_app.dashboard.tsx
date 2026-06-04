import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatusBadge } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects, tasks, activity, lessons } from "@/lib/mock-data";
import { Briefcase, CheckSquare, Database, Lightbulb, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Freelancer's Portal" }] }),
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    { label: "Active projects", value: projects.filter((p) => p.status === "active").length, icon: Briefcase },
    { label: "Open tasks", value: tasks.filter((t) => t.status !== "done").length, icon: CheckSquare },
    { label: "Assets", value: 24, icon: Database },
    { label: "Lessons logged", value: lessons.length, icon: Lightbulb },
  ];
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Snapshot of your work and recent activity."
        actions={<Button><Plus className="mr-2 h-4 w-4" />New project</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-lg bg-primary/10 p-2.5 text-primary"><s.icon className="h-5 w-5" /></div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
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
            {projects.filter((p) => p.status === "active").map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.client} · updated {p.updated}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {activity.map((a) => (
              <div key={a.id} className="text-sm">
                <p>{a.text}</p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}