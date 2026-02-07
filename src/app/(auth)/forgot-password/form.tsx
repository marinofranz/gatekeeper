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

const formSchema = z.object({
  email: z.email(),
});

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await authClient.requestPasswordReset(
      {
        email: data.email,
        redirectTo: `${window.location.origin}/reset-password`,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          setResetSent(true);
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
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" loading={loading} disabled={resetSent}>
          {resetSent ? "Instructions sent" : "Send reset instructions"}
        </Button>

        <span className="text-muted-foreground text-xs text-center">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Login
          </a>
        </span>
      </FieldGroup>
    </form>
  );
}
