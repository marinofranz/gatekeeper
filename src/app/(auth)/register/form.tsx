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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string().min(6),
});

export function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
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
          form.setError("root", {
            message: error.message,
          });
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {form.formState.errors.root && (
          <FieldError
            className="text-center"
            errors={[form.formState.errors.root]}
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="John"
                  aria-invalid={fieldState.invalid}
                  required
                />
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Doe"
                  aria-invalid={fieldState.invalid}
                  required
                />
              </Field>
            )}
          />
        </div>

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
          Register
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
      </FieldGroup>
    </form>
  );
}
