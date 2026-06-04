import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { projects, tasks, assets, notes, lessons } from "@/lib/mock-data";
import { Briefcase, CheckSquare, Database, FileText, Lightbulb, Search as SearchIcon } from "lucide-react";

export const Route = createFileRoute("/_app/search")({
  head: () => ({ meta: [{ title: "Search — Freelancer's Portal" }] }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const match = (s: string) => q.length > 0 && s.toLowerCase().includes(q.toLowerCase());
  const results = q
    ? [
        ...projects.filter((p) => match(p.name) || match(p.client)).map((p) => ({ type: "Project", icon: Briefcase, title: p.name, sub: p.client, id: p.id })),
        ...tasks.filter((t) => match(t.title)).map((t) => ({ type: "Task", icon: CheckSquare, title: t.title, sub: `Due ${t.due}`, id: t.id })),
        ...assets.filter((a) => match(a.title)).map((a) => ({ type: "Asset", icon: Database, title: a.title, sub: a.type, id: a.id })),
        ...notes.filter((n) => match(n.title) || match(n.excerpt)).map((n) => ({ type: "Note", icon: FileText, title: n.title, sub: n.excerpt, id: n.id })),
        ...lessons.filter((l) => match(l.title)).map((l) => ({ type: "Lesson", icon: Lightbulb, title: l.title, sub: l.impact, id: l.id })),
      ]
    : [];
  return (
    <div>
      <PageHeader title="Unified Search" description="Search across projects, tasks, assets, notes, and lessons." />
      <div className="relative mb-6 max-w-2xl">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input className="h-11 pl-9 text-base" placeholder="Try 'SQL', 'Acme', 'webhook'…" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
      </div>
      {!q && (
        <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">
          Start typing to search your workspace.
        </div>
      )}
      {q && results.length === 0 && (
        <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">
          No results for "{q}".
        </div>
      )}
      <div className="space-y-2">
        {results.map((r) => (
          <Card key={`${r.type}-${r.id}`}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-md bg-primary/10 p-2 text-primary"><r.icon className="h-4 w-4" /></div>
              <div className="flex-1">
                <p className="font-medium">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.sub}</p>
              </div>
              <span className="text-xs text-muted-foreground">{r.type}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}