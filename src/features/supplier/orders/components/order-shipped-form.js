"use client";

import { InputField } from "@/components/input-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { useFormState } from "react-dom";
import { shipped } from "../server/actions/orders";

export function OrderShippedForm({ orderId }) {
  const [state, formAction] = useFormState(
    shipped.bind(null, orderId),
    undefined,
  );

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <InputField
          type="text"
          id="shipping_carrier"
          label="Shipping carrier"
          placeholder="e.g. UPS, FedEx, DHL, etc"
          error={state?.errors?.shipping_carrier}
        />
        <InputField
          type="text"
          id="tracking_number"
          label="Tracking number"
          placeholder="e.g. 1Z999AA10123456784"
          error={state?.errors?.tracking_number}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end">
        <SubmitButton>Confirm</SubmitButton>
      </div>
    </form>
  );
}
