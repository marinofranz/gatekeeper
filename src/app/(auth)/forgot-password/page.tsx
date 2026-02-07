import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "./form";

export default async function ForgotPasswordPage() {
  const session = await getSession();

  if (session?.user) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex flex-col justify-between items-center p-12 grow">
      <div className="h-full flex flex-col gap-24 max-w-md w-full justify-between">
        <header className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold font-mono tracking-tighter text-slate-900">
            Gatekeeper
          </h1>
        </header>

        <ForgotPasswordForm />

        <footer className="flex flex-row items-center justify-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Gatekeeper
        </footer>
      </div>
    </div>
  );
}
