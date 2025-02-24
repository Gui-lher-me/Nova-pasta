"use client";

import { InputField } from "@/components/input-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { useFormState } from "react-dom";
import { redeem } from "../server/actions/redeem";

export function RedeemCodeForm() {
  const [state, formAction] = useFormState(redeem, undefined);

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
        <InputField
          stacked
          type="text"
          id="code"
          label="RocketHub code"
          placeholder="Enter your code here"
          error={state?.errors?.code}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5">
        <SubmitButton fullWidth>Claim free plan</SubmitButton>
      </div>
    </form>
  );
}
