import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Briefcase, Database, Lightbulb, Search, CheckSquare, FileText } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Freelancer's Portal — Your work memory system" },
      { name: "description", content: "Centralize projects, tasks, assets, notes and lessons in one structured workspace built for independent freelancers." },
      { property: "og:title", content: "Freelancer's Portal" },
      { property: "og:description", content: "A personal-first work memory system for solo professionals." },
    ],
  }),
  component: Index,
});

function Index() {
  const features = [
    { icon: Briefcase, title: "Projects", desc: "Track every engagement end-to-end." },
    { icon: CheckSquare, title: "Tasks", desc: "Priorities, statuses, and due dates." },
    { icon: Database, title: "Assets Library", desc: "SQL, workflows, SOPs, templates." },
    { icon: FileText, title: "Notes", desc: "Capture thinking as it happens." },
    { icon: Lightbulb, title: "Lessons", desc: "Never solve the same problem twice." },
    { icon: Search, title: "Unified Search", desc: "Find anything across everything." },
  ];
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-7 w-7 rounded-md bg-primary" />
            Freelancer's Portal
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild><Link to="/login">Log in</Link></Button>
            <Button asChild><Link to="/signup">Get started</Link></Button>
          </div>
        </div>
      </header>
      <section className="container mx-auto px-6 py-24 text-center">
        <p className="mb-4 inline-block rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">For independent freelancers</p>
        <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight md:text-6xl">
          Your entire work life, finally in one place.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Stop digging through chats, drives and old folders. Freelancer's Portal is a structured workspace for projects, reusable assets, notes, and the lessons that make your next project faster.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button size="lg" asChild><Link to="/signup">Start free</Link></Button>
          <Button size="lg" variant="outline" asChild><Link to="/dashboard">View demo</Link></Button>
        </div>
      </section>
      <section className="container mx-auto grid gap-4 px-6 pb-24 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border bg-card p-6">
            <f.icon className="mb-3 h-6 w-6 text-primary" />
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © 2026 Freelancer's Portal
      </footer>
    </div>
  );
}
