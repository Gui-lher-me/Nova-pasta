"use client";

import { SelectField } from "@/components/select-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { MANUFACTURING_TIME_OPTIONS } from "@/constants";
import { useFormState } from "react-dom";
import { manufacturing } from "../../server/actions/shippings";

export function ManufacturingForm({ manufacturingTime }) {
  const [state, formAction] = useFormState(manufacturing, undefined);

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <SelectField
          id="manufacturing_time"
          label="Time"
          helperText="How long does it take you to prepare and ship an order after receiving the payment? Stores will see this, and it will be used to calculate if orders are late"
          options={MANUFACTURING_TIME_OPTIONS}
          defaultValue={manufacturingTime}
          error={state?.errors?.manufacturing_time}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end gap-x-2">
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
}
