import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Freelancer's Portal" }] }),
  component: SignupPage,
});

function SignupPage() {
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
        <h1 className="text-xl font-semibold">Create your workspace</h1>
        <p className="mt-1 text-sm text-muted-foreground">Start your free trial. No card required.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
            const email = (form.elements.namedItem("email") as HTMLInputElement).value;
            const password = (form.elements.namedItem("password") as HTMLInputElement).value;
            setLoading(true);
            const { error } = await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${window.location.origin}/dashboard`,
                data: { full_name: name },
              },
            });
            setLoading(false);
            if (error) {
              toast.error(error.message);
              return;
            }
            toast.success("Account created");
            navigate({ to: "/dashboard" });
          }}
        >
          <div className="space-y-1.5"><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
          <div className="space-y-1.5"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
          <div className="space-y-1.5"><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" required /></div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating…" : "Create account"}</Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}