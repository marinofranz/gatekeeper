import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      disableSignUp: true,
    },
  },
  plugins: [
    passkey({
      rpID: "marino.codes",
      rpName: "Gatekeeper",
    }),
    organization(),
  ],
  account: {
    accountLinking: {
      disableImplicitLinking: true,
    },
  },
  advanced: {
    cookiePrefix: "gatekeeper",
  },
});
