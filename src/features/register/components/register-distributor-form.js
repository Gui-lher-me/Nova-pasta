"use client";

import { InputField } from "@/components/input-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { useFormState } from "react-dom";
import { register } from "../server/actions/register";

export function RegisterDistributorForm() {
  const [state, formAction] = useFormState(register, undefined);

  return (
    <form action={formAction}>
      <div className="grid gap-2">
        <InputField
          stacked
          type="email"
          id="email"
          label="Email"
          placeholder="e.g. john.doe@example.com"
          error={state?.errors?.email}
        />
        <InputField
          stacked
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password"
          error={state?.errors?.password}
        />
        <InputField
          stacked
          type="password"
          id="confirm"
          label="Confirm"
          placeholder="Repeat your password"
          error={state?.errors?.confirm}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5">
        <SubmitButton fullWidth>Register account</SubmitButton>
      </div>
    </form>
  );
}
