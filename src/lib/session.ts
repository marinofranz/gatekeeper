import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const getSession = async () =>
  await auth.api.getSession({
    headers: await headers(),
  });

export const getSessionOrRedirect = async (redirectTo: string) => {
  const session = await getSession();
  if (!session) {
    return redirect(redirectTo);
  }

  return session;
};
