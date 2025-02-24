"use client";

import { InputField } from "@/components/input-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { useFormState } from "react-dom";
import { shopify } from "../../server/actions/integrations";

export function ShopifyConnectionForm({ supplierId }) {
  const [state, formAction] = useFormState(
    shopify.bind(null, supplierId),
    undefined,
  );

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <InputField
          type="text"
          id="shopifyUrl"
          label="Shopify URL"
          placeholder="e.g. yourstore.myshopify.com"
          error={state?.errors?.shopifyUrl}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end gap-x-2">
        <SubmitButton>Connect</SubmitButton>
      </div>
    </form>
  );
}
