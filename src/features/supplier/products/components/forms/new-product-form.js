"use client";

import { InputField } from "@/components/input-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { useFormState } from "react-dom";
import { newProduct } from "../../server/actions/products";

export function NewProductForm() {
  const [state, formAction] = useFormState(newProduct, undefined);

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <InputField
          type="text"
          id="title"
          label="Title"
          placeholder="e.g. Awesome Product Name"
          error={state?.errors?.title}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end">
        <SubmitButton>Create</SubmitButton>
      </div>
    </form>
  );
}
