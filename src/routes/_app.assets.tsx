import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { assets } from "@/lib/mock-data";
import { Plus, Search, FileCode } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/assets")({
  head: () => ({ meta: [{ title: "Assets — Freelancer's Portal" }] }),
  component: AssetsPage,
});

function AssetsPage() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const allTags = Array.from(new Set(assets.flatMap((a) => a.tags)));
  const filtered = assets.filter((a) => a.title.toLowerCase().includes(q.toLowerCase()) && (!tag || a.tags.includes(tag)));
  return (
    <div>
      <PageHeader
        title="Assets Library"
        description="Reusable SQL, workflows, templates, and SOPs."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />New asset</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create asset</DialogTitle></DialogHeader>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Asset created (mock)"); }}>
                <div className="space-y-1.5"><Label>Title</Label><Input required /></div>
                <div className="space-y-1.5"><Label>Type</Label><Input placeholder="SQL, Workflow, Template, SOP" /></div>
                <div className="space-y-1.5"><Label>Tags (comma-separated)</Label><Input /></div>
                <DialogFooter><Button type="submit">Create</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8" placeholder="Search assets…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Button size="sm" variant={tag === null ? "default" : "outline"} onClick={() => setTag(null)}>All tags</Button>
        {allTags.map((t) => (
          <Button key={t} size="sm" variant={tag === t ? "default" : "outline"} onClick={() => setTag(t)}>{t}</Button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">No assets match.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <Card key={a.id} className="transition hover:shadow-md">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-md bg-primary/10 p-2 text-primary"><FileCode className="h-4 w-4" /></div>
                  <span className="text-xs font-medium text-muted-foreground">{a.type}</span>
                </div>
                <h3 className="font-semibold">{a.title}</h3>
                <div className="mt-3 flex flex-wrap gap-1">
                  {a.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Updated {a.updated}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}