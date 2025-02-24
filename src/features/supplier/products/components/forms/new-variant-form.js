"use client";

import { InputField } from "@/components/input-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { useFormState } from "react-dom";
import { newVariant } from "../../server/actions/products";

export function NewVariantForm({ productId }) {
  const [state, formAction] = useFormState(
    newVariant.bind(null, productId),
    undefined,
  );

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <InputField
          type="text"
          id="name"
          label="Name"
          placeholder="e.g. Blue shirt"
          error={state?.errors?.name}
        />
        <InputField
          type="text"
          id="sku"
          label="SKU"
          placeholder="e.g. PROD-34"
          error={state?.errors?.sku}
        />
        <InputField
          step="1"
          type="number"
          id="quantity"
          label="Quantity"
          placeholder="e.g. 3"
          error={state?.errors?.quantity}
        />
        <InputField
          style="currency"
          step="0.01"
          type="number"
          id="price"
          label="Reseller price"
          placeholder="e.g. 39.99"
          error={state?.errors?.price}
        />
        <InputField
          style="currency"
          step="0.01"
          type="number"
          id="retailPrice"
          label="Retail price"
          placeholder="e.g. 57.99"
          error={state?.errors?.retailPrice}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end">
        <SubmitButton>Create</SubmitButton>
      </div>
    </form>
  );
}
