"use client";

import { InputField } from "@/components/input-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { useFormState } from "react-dom";
import { paypal } from "../../server/actions/integrations";

export function PayPalConnectionForm({ merchantId }) {
  const [state, formAction] = useFormState(paypal, undefined);

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <InputField
          type="text"
          id="merchantId"
          label="Merchant ID"
          placeholder="e.g. DFBH67E4KIBGC"
          defaultValue={merchantId}
          error={state?.errors?.merchantId}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end gap-x-2">
        <SubmitButton>{merchantId ? "Update" : "Connect"}</SubmitButton>
      </div>
    </form>
  );
}
