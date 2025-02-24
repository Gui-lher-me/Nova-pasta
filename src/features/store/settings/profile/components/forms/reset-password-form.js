"use client";

import { Button } from "@/components/button";
import { InputField } from "@/components/input-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { resetSchema } from "../../schemas/profile";
import { reset } from "../../server/actions/profile";

export function ResetPasswordForm() {
  const form = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirm: "" },
  });

  const onSubmit = async ({ password, confirm }) => {
    const data = await reset({ password, confirm });

    if (data.message) {
      toast(data.message, {
        type: data?.error ? "error" : "success",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <InputField
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password"
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />
        <InputField
          type="password"
          id="confirm"
          label="Confirm"
          placeholder="Repeat your password"
          error={form.formState.errors.confirm?.message}
          {...form.register("confirm")}
        />
      </div>
      <div className="mt-5 flex justify-end gap-x-2">
        <Button
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
