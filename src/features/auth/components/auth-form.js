"use client";

import { Button } from "@/components/button";
import { InputField } from "@/components/input-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginSchema, signupSchema } from "../schemas/auth";
import { auth } from "../server/actions/auth";

export function AuthForm({ formMode }) {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formMode === "signup" ? signupSchema : loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values) => {
    startTransition(async () => {
      const data = await auth(formMode, values);

      if (data.error) {
        toast(data.message, {
          type: "error",
        });
      } else if (data.redirectTo) {
        router.push(data.redirectTo);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <InputField
          stacked
          type="email"
          id="email"
          label="Email"
          placeholder="e.g. john.doe@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <InputField
          stacked
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>
      <div className="mt-5">
        <Button fullWidth loading={isPending}>
          {formMode === "login" ? "Sign in" : "Sign up"}
        </Button>
      </div>
    </form>
  );
}
