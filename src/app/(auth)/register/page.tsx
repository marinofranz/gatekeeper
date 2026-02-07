import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { type LucideIcon, Timer, Shield, Users } from "lucide-react";
import { RegisterForm } from "./form";

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

          <RegisterForm />

          <footer className="flex flex-row items-center justify-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Gatekeeper
          </footer>
        </div>
      </div>
    </>
  );
}
