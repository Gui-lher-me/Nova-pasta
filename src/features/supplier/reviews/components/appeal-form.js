"use client";

import { SubmitButton } from "@/components/submit-button";
import { TextareaField } from "@/components/textarea-field";
import { Toast } from "@/components/toast";
import { useFormState } from "react-dom";
import { appeal } from "../server/actions/reviews";

export function AppealForm({ supplierId }) {
  const [state, formAction] = useFormState(
    appeal.bind(null, supplierId),
    undefined,
  );

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <TextareaField
          stacked
          id="reason"
          label="Reason for review removal"
          placeholder="Enter your reason..."
          error={state?.errors?.reason}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end">
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  );
}
