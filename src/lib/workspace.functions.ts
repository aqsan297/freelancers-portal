import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type WorkspaceSummary = {
  counts: { projects: number; tasks: number; notes: number; lessons: number; assets: number };
  openTasks: number;
  activeProjects: Array<{
    id: string;
    name: string;
    client_name: string | null;
    status: string | null;
    progress: number | null;
    updated_at: string;
  }>;
  recentTasks: Array<{
    id: string;
    title: string;
    status: string | null;
    priority: string | null;
    due_date: string | null;
    updated_at: string;
  }>;
  recentNotes: Array<{ id: string; title: string; updated_at: string }>;
  recentLessons: Array<{ id: string; title: string; created_at: string }>;
};

export const getWorkspaceSummary = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<WorkspaceSummary> => {
    const { supabase } = context;

    const [projectsRes, tasksRes, notesRes, lessonsRes, assetsCountRes] = await Promise.all([
      supabase
        .from("projects")
        .select("id, name, client_name, status, progress, updated_at")
        .order("updated_at", { ascending: false }),
      supabase
        .from("tasks")
        .select("id, title, status, priority, due_date, updated_at")
        .order("updated_at", { ascending: false }),
      supabase
        .from("notes")
        .select("id, title, updated_at")
        .order("updated_at", { ascending: false })
        .limit(5),
      supabase
        .from("lessons")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase.from("assets").select("id", { count: "exact", head: true }),
    ]);

    if (projectsRes.error) throw projectsRes.error;
    if (tasksRes.error) throw tasksRes.error;
    if (notesRes.error) throw notesRes.error;
    if (lessonsRes.error) throw lessonsRes.error;
    if (assetsCountRes.error) throw assetsCountRes.error;

    const projects = projectsRes.data ?? [];
    const tasks = tasksRes.data ?? [];
    const notes = notesRes.data ?? [];
    const lessons = lessonsRes.data ?? [];

    return {
      counts: {
        projects: projects.length,
        tasks: tasks.length,
        notes: notes.length,
        lessons: lessons.length,
        assets: assetsCountRes.count ?? 0,
      },
      openTasks: tasks.filter((t) => t.status !== "done").length,
      activeProjects: projects.filter((p) => p.status === "active").slice(0, 5),
      recentTasks: tasks.slice(0, 5),
      recentNotes: notes,
      recentLessons: lessons,
    };
  });