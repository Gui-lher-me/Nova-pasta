"use client";

import { InputField } from "@/components/input-field";
import { SelectField } from "@/components/select-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { useFormState } from "react-dom";
import { referral } from "../server/actions/referrals";

export function NewReferralForm() {
  const [state, formAction] = useFormState(referral, undefined);

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <InputField
          type="text"
          id="sender_name"
          label="Your name"
          placeholder="e.g. John Doe"
          error={state?.errors?.sender_name}
        />
        <SelectField
          id="recipient_type"
          label="Recipient type"
          options={[
            { label: "Store", value: "STORE" },
            { label: "Supplier", value: "SUPPLIER" },
          ]}
          defaultValue="STORE"
          tooltip="Are you referring someone to become a Vendor (a dropshipper / reseller of your products), or a Supplier who makes their own products?"
          error={state?.errors?.recipient_type}
        />
        <InputField
          type="text"
          id="recipient_name"
          label="Referral name"
          placeholder="e.g. John Doe"
          error={state?.errors?.recipient_name}
        />
        <InputField
          type="email"
          id="recipient_email"
          label="Referral email"
          placeholder="e.g. john.doe@example.com"
          error={state?.errors?.recipient_email}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end gap-x-2">
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  );
}
