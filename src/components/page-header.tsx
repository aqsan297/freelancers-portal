import { ReactNode } from "react";

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-primary/10 text-primary",
    "in-progress": "bg-primary/10 text-primary",
    completed: "bg-emerald-500/10 text-emerald-700",
    done: "bg-emerald-500/10 text-emerald-700",
    "on-hold": "bg-amber-500/10 text-amber-700",
    archived: "bg-muted text-muted-foreground",
    todo: "bg-muted text-muted-foreground",
    high: "bg-rose-500/10 text-rose-700",
    medium: "bg-amber-500/10 text-amber-700",
    low: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      {status.replace("-", " ")}
    </span>
  );
}