import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
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
              <div className="flex flex-row items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline underline-offset-4"
                >
                  Forgot password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>

            <Button type="submit">Login</Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <Button variant="outline" type="button">
              Login with Google
            </Button>

            <span className="text-muted-foreground text-xs text-center">
              Don{"'"}t have an account?{" "}
              <a
                href="/register"
                className="text-primary underline-offset-4 hover:underline"
              >
                Register
              </a>
            </span>
          </div>
        </form>

        <footer className="flex flex-row items-center justify-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Gatekeeper
        </footer>
      </div>
    </div>
  );
}
