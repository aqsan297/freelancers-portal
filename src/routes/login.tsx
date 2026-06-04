import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — Freelancer's Portal" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Toaster />
      <div className="w-full max-w-sm rounded-xl border bg-card p-8">
        <Link to="/" className="mb-6 flex items-center gap-2 font-semibold">
          <div className="h-7 w-7 rounded-md bg-primary" />
          Freelancer's Portal
        </Link>
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Log in to your workspace.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const email = (form.elements.namedItem("email") as HTMLInputElement).value;
            const password = (form.elements.namedItem("password") as HTMLInputElement).value;
            setLoading(true);
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            setLoading(false);
            if (error) {
              toast.error(error.message);
              return;
            }
            toast.success("Signed in");
            navigate({ to: "/dashboard" });
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@studio.com" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in…" : "Log in"}</Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here? <Link to="/signup" className="text-primary hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}