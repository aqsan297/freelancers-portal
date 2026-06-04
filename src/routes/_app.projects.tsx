import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, StatusBadge } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projects } from "@/lib/mock-data";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/projects")({
  head: () => ({ meta: [{ title: "Projects — Freelancer's Portal" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = projects.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.client.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Track every client engagement in one place."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />New project</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create project</DialogTitle></DialogHeader>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Project created (mock)"); }}>
                <div className="space-y-1.5"><Label>Name</Label><Input required /></div>
                <div className="space-y-1.5"><Label>Client</Label><Input /></div>
                <div className="space-y-1.5"><Label>Description</Label><Input /></div>
                <DialogFooter><Button type="submit">Create</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="mb-4 flex items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8" placeholder="Search projects…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <Tabs defaultValue="cards">
        <TabsList><TabsTrigger value="cards">Cards</TabsTrigger><TabsTrigger value="list">List</TabsTrigger></TabsList>
        <TabsContent value="cards" className="mt-4">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed p-12 text-center">
              <p className="font-medium">No projects match your search</p>
              <p className="mt-1 text-sm text-muted-foreground">Try a different keyword or create a new project.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Card key={p.id} className="transition hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{p.name}</h3>
                        <p className="text-xs text-muted-foreground">{p.client}</p>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
                    <div className="mt-4">
                      <div className="mb-1 flex justify-between text-xs"><span>Progress</span><span>{p.progress}%</span></div>
                      <div className="h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${p.progress}%` }} /></div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">Updated {p.updated}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <Card><CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Client</TableHead><TableHead>Status</TableHead><TableHead>Progress</TableHead><TableHead>Updated</TableHead></TableRow></TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id}><TableCell className="font-medium">{p.name}</TableCell><TableCell>{p.client}</TableCell><TableCell><StatusBadge status={p.status} /></TableCell><TableCell>{p.progress}%</TableCell><TableCell>{p.updated}</TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}