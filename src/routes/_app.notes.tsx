import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { notes, projects } from "@/lib/mock-data";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/notes")({
  head: () => ({ meta: [{ title: "Notes — Freelancer's Portal" }] }),
  component: NotesPage,
});

function NotesPage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = notes.filter((n) => n.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader
        title="Notes"
        description="Capture thinking — linked to a project or standalone."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />New note</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create note</DialogTitle></DialogHeader>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Note created (mock)"); }}>
                <div className="space-y-1.5"><Label>Title</Label><Input required /></div>
                <div className="space-y-1.5"><Label>Content</Label><Textarea rows={5} /></div>
                <DialogFooter><Button type="submit">Create</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <Input className="mb-4 max-w-sm" placeholder="Search notes…" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((n) => {
          const proj = projects.find((p) => p.id === n.projectId);
          return (
            <Card key={n.id} className="transition hover:shadow-md">
              <CardContent className="p-5">
                <h3 className="font-semibold">{n.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{proj?.name ?? "Standalone"} · {n.updated}</p>
                <p className="mt-3 text-sm text-muted-foreground">{n.excerpt}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}