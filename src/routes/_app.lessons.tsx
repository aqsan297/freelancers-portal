import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { lessons, projects } from "@/lib/mock-data";
import { Lightbulb, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/lessons")({
  head: () => ({ meta: [{ title: "Lessons — Freelancer's Portal" }] }),
  component: LessonsPage,
});

function LessonsPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageHeader
        title="Lessons Learned"
        description="Distill what you learned so the next project starts smarter."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />New lesson</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Log a lesson</DialogTitle></DialogHeader>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Lesson logged (mock)"); }}>
                <div className="space-y-1.5"><Label>Title</Label><Input required /></div>
                <div className="space-y-1.5"><Label>What happened?</Label><Textarea rows={4} /></div>
                <DialogFooter><Button type="submit">Save lesson</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="space-y-3">
        {lessons.map((l) => {
          const proj = projects.find((p) => p.id === l.projectId);
          return (
            <Card key={l.id}>
              <CardContent className="flex items-start gap-4 p-5">
                <div className="rounded-lg bg-amber-500/10 p-2.5 text-amber-700"><Lightbulb className="h-5 w-5" /></div>
                <div className="flex-1">
                  <h3 className="font-semibold">{l.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{proj?.name} · {l.created}</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700">{l.impact}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}