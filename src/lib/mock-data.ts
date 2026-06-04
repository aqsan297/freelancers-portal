export type Status = "active" | "completed" | "on-hold" | "archived";
export type TaskStatus = "todo" | "in-progress" | "done";
export type Priority = "low" | "medium" | "high";

export const projects = [
  { id: "p1", name: "Acme CRM Setup", client: "Acme Co", status: "active" as Status, progress: 62, updated: "2 hours ago", description: "Configure HubSpot pipelines and lifecycle stages." },
  { id: "p2", name: "Quarterly Reporting Pipeline", client: "Northwind", status: "active" as Status, progress: 30, updated: "Yesterday", description: "Automate SQL reports into Looker Studio." },
  { id: "p3", name: "Zapier Onboarding Flow", client: "Initech", status: "on-hold" as Status, progress: 80, updated: "3 days ago", description: "Multi-step onboarding automation across Slack and Notion." },
  { id: "p4", name: "Legacy Data Migration", client: "Globex", status: "completed" as Status, progress: 100, updated: "Last week", description: "Migrate Postgres → Snowflake with validation." },
];

export const tasks = [
  { id: "t1", projectId: "p1", title: "Map lifecycle stages", status: "in-progress" as TaskStatus, priority: "high" as Priority, due: "Jun 8" },
  { id: "t2", projectId: "p1", title: "Import contact list", status: "todo" as TaskStatus, priority: "medium" as Priority, due: "Jun 10" },
  { id: "t3", projectId: "p2", title: "Write monthly cohort SQL", status: "in-progress" as TaskStatus, priority: "high" as Priority, due: "Jun 6" },
  { id: "t4", projectId: "p2", title: "Connect Looker data source", status: "todo" as TaskStatus, priority: "medium" as Priority, due: "Jun 12" },
  { id: "t5", projectId: "p3", title: "QA Slack triggers", status: "done" as TaskStatus, priority: "low" as Priority, due: "Jun 1" },
  { id: "t6", projectId: "p4", title: "Validate row counts", status: "done" as TaskStatus, priority: "high" as Priority, due: "May 20" },
];

export const assets = [
  { id: "a1", title: "Cohort Retention SQL", type: "SQL", tags: ["analytics", "retention"], updated: "May 30" },
  { id: "a2", title: "Client Kickoff Template", type: "Template", tags: ["onboarding"], updated: "Apr 12" },
  { id: "a3", title: "Zapier Onboarding Workflow", type: "Workflow", tags: ["automation", "slack"], updated: "May 18" },
  { id: "a4", title: "Incident Response SOP", type: "SOP", tags: ["ops"], updated: "Mar 02" },
  { id: "a5", title: "Monthly Report SQL", type: "SQL", tags: ["reporting"], updated: "May 28" },
  { id: "a6", title: "Discovery Call Script", type: "Template", tags: ["sales"], updated: "Feb 14" },
];

export const notes = [
  { id: "n1", title: "Acme stakeholder map", projectId: "p1", excerpt: "Primary: Jane (Ops). Decision-maker: Mark (COO)…", updated: "1d ago" },
  { id: "n2", title: "Looker quirks", projectId: "p2", excerpt: "Date filters don't cascade unless inheritance is on…", updated: "3d ago" },
  { id: "n3", title: "Ideas backlog", projectId: null, excerpt: "Build a reusable client-intake form template…", updated: "1w ago" },
];

export const lessons = [
  { id: "l1", title: "Always confirm timezone in SQL date filters", projectId: "p2", impact: "Saved 2h", created: "May 22" },
  { id: "l2", title: "Stakeholder alignment before tooling", projectId: "p1", impact: "Avoided rework", created: "May 12" },
  { id: "l3", title: "Test webhook payloads in staging first", projectId: "p3", impact: "Avoided outage", created: "Apr 30" },
];

export const activity = [
  { id: "ac1", text: "Completed task: Validate row counts", time: "1h ago" },
  { id: "ac2", text: "Added asset: Cohort Retention SQL", time: "5h ago" },
  { id: "ac3", text: "Updated project: Acme CRM Setup", time: "Yesterday" },
  { id: "ac4", text: "New lesson logged in Looker quirks", time: "2d ago" },
];