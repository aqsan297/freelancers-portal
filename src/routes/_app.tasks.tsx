import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, StatusBadge } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { tasks as initial, projects } from "@/lib/mock-data";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/tasks")({
  head: () => ({ meta: [{ title: "Tasks — Freelancer's Portal" }] }),
  component: TasksPage,
});

function TasksPage() {
  const [tasks, setTasks] = useState(initial);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "todo" | "in-progress" | "done">("all");
  const filtered = tasks.filter((t) => filter === "all" || t.status === filter);
  return (
    <div>
      <PageHeader
        title="Tasks"
        description="Priorities, statuses, and due dates across every project."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />New task</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create task</DialogTitle></DialogHeader>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Task created (mock)"); }}>
                <div className="space-y-1.5"><Label>Title</Label><Input required /></div>
                <div className="space-y-1.5"><Label>Due date</Label><Input type="date" /></div>
                <DialogFooter><Button type="submit">Create</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="mb-4 flex gap-2">
        {(["all", "todo", "in-progress", "done"] as const).map((f) => (
          <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="capitalize">{f.replace("-", " ")}</Button>
        ))}
      </div>
      <Card>
        <CardContent className="divide-y p-0">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-sm text-muted-foreground">No tasks here yet.</div>
          ) : (
            filtered.map((t) => {
              const proj = projects.find((p) => p.id === t.projectId);
              return (
                <div key={t.id} className="flex items-center gap-4 p-4">
                  <Checkbox checked={t.status === "done"} onCheckedChange={() => setTasks((ts) => ts.map((x) => x.id === t.id ? { ...x, status: x.status === "done" ? "todo" : "done" } : x))} />
                  <div className="flex-1">
                    <p className={`font-medium ${t.status === "done" ? "text-muted-foreground line-through" : ""}`}>{t.title}</p>
                    <p className="text-xs text-muted-foreground">{proj?.name} · Due {t.due}</p>
                  </div>
                  <StatusBadge status={t.priority} />
                  <StatusBadge status={t.status} />
                  <Button variant="ghost" size="icon" onClick={() => setTasks((ts) => ts.filter((x) => x.id !== t.id))}><Trash2 className="h-4 w-4" /></Button>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}