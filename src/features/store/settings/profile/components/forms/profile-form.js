"use client";

import { Button } from "@/components/button";
import { InputField } from "@/components/input-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { storeProfileSchema } from "../../schemas/profile";
import { profile } from "../../server/actions/profile";

export function ProfileForm({ settings }) {
  const form = useForm({
    resolver: zodResolver(storeProfileSchema),
    defaultValues: { name: settings.store?.name, owner_email: settings.email },
  });

  const onSubmit = async ({ name, owner_email }) => {
    const data = await profile({ name, owner_email });

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
          type="text"
          id="name"
          label="Name"
          placeholder="e.g. Acme Corporation"
          error={form.formState.errors.name?.message}
          {...form.register("name")}
        />
        <InputField
          type="email"
          id="owner_email"
          label="Email"
          placeholder="e.g. john.doe@example.com"
          readOnly
          tooltip="Read only"
          error={form.formState.errors.owner_email?.message}
          {...form.register("owner_email")}
        />
      </div>
      <div className="mt-5 flex justify-end">
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
