"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { authClient } from "@/lib/client/auth";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const errorParam = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    account_not_linked: "No account found with the provided email.",
    access_denied: "Access denied. Please try again.",
    signup_disabled: "Please create an account before logging in.",
  };

  const error = errorParam
    ? errorMessages[errorParam] || "An unknown error occurred."
    : null;

  const signInWithGoogle = () => {
    setLoading(true);
    authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/login",
    });
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: ({ error }) => {
          setLoading(false);
          form.setError("email", {
            message: error.message,
          });
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {error && (
          <FieldError className="text-center" errors={[{ message: error }]} />
        )}

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                aria-invalid={fieldState.invalid}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" loading={loading}>
          Login
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          loading={loading}
          onClick={signInWithGoogle}
        >
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
      </FieldGroup>
    </form>
  );
}
