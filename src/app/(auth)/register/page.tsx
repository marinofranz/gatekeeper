import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { type LucideIcon, Timer, Shield, Users } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Timer,
    title: "Lightning Fast",
    description: "Create and manage tickets instantly",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security for your data",
  },
  {
    icon: Users,
    title: "Easy Collaboration",
    description: "Share and manage tickets with your team",
  },
];

export default async function RegisterPage() {
  const session = await getSession();

  if (session?.user) {
    return redirect("/dashboard");
  }

  return (
    <>
      <div className="lg:flex h-full p-12 aspect-9/16 hidden">
        <div className="bg-sidebar h-full w-full p-8 rounded-xl">
          <div className="flex flex-col h-full justify-end">
            <h1 className="text-3xl font-extrabold font-mono text-foreground">
              Start managing tickets in seconds.
            </h1>

            <div className="mt-8 space-y-4">
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-3">
                  <Icon className="text-primary size-5 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900 text-sm">
                      {title}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center p-12 grow">
        <div className="h-full flex flex-col gap-24 max-w-md w-full justify-between">
          <header className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold font-mono tracking-tighter text-slate-900">
              Gatekeeper
            </h1>
          </header>

          <form>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>

              <Button type="submit">Register</Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>

              <Button variant="outline" type="button">
                Register with Google
              </Button>

              <span className="text-muted-foreground text-xs text-center">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Login
                </a>
              </span>
            </div>
          </form>

          <footer className="flex flex-row items-center justify-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Gatekeeper
          </footer>
        </div>
      </div>
    </>
  );
}
