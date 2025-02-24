"use client";

import { CheckboxField } from "@/components/checkbox-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { AGREEMENTS } from "@/constants";
import { useFormState } from "react-dom";
import { agreement } from "../server/actions/agreement";

export function AgreementForm({ agreed }) {
  const [state, formAction] = useFormState(agreement, undefined);

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        {AGREEMENTS.map((agreement) => (
          <CheckboxField
            key={agreement.id}
            id={agreement.id}
            label={agreement.label}
            helperText={agreement.description}
            disabled={agreed}
            defaultChecked={agreed}
            error={undefined}
          />
        ))}
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end gap-x-2">
        <SubmitButton disabled={agreed}>Accept agreements</SubmitButton>
      </div>
    </form>
  );
}
