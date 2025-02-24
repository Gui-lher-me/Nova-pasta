"use client";

import { FormSection } from "@/components/form-section";
import { InputField } from "@/components/input-field";
import { SubmitButton } from "@/components/submit-button";
import { SwitchField } from "@/components/switch-field";
import { TextareaField } from "@/components/textarea-field";
import { Toast } from "@/components/toast";
import { useState } from "react";
import { useFormState } from "react-dom";
import { saveProduct } from "../../server/actions/products";

export function ProductForm({ product }) {
  const [state, formAction] = useFormState(
    saveProduct.bind(null, product.id),
    undefined,
  );

  const [overrideDiscountPercent, setOverrideDiscountPercent] = useState(
    product.override_discount_percent,
  );

  return (
    <form action={formAction}>
      <div>
        <FormSection title="Basic info">
          <InputField
            label="Title"
            type="text"
            id="title"
            placeholder="e.g. Awesome Product Name"
            error={state?.errors?.["title"]}
            defaultValue={product.title}
          />
          <TextareaField
            label="Description"
            id="description"
            placeholder="e.g. This is a brief description of the product, highlighting its key features, benefits, and any other relevant details that would entice a potential buyer."
            error={state?.errors?.["description"]}
            defaultValue={product.description}
            optional
          />
          <InputField
            label="SKU"
            type="text"
            id="sku"
            placeholder="e.g. PROD-12345"
            error={state?.errors?.["sku"]}
            defaultValue={product.sku}
          />
        </FormSection>
        <FormSection title="Pricing info">
          <SwitchField
            id="featured"
            label="Featured"
            defaultChecked={product.featured}
            error={state?.errors?.white_label_packaging}
          />
          <SwitchField
            id="track_inventory"
            label="Sync Shopify inventory"
            helperText="This product's inventory is synced from your Shopify account daily. Please ensure your inventory is accurate in Shopify."
            defaultChecked={product.track_inventory}
            error={state?.errors?.track_inventory}
          />
          <SwitchField
            id="track_pricing"
            label="Sync Shopify pricing"
            helperText="This product's price is synced from your Shopify account daily, based on a percentage off 'retail price', as defined in your profile settings."
            defaultChecked={product.track_pricing}
            error={state?.errors?.track_pricing}
          />
          <SwitchField
            id="override_discount_percent"
            label="Override reseller margin"
            helperText="If you need to offer a different margin for this product specifically, adjust the discount percentage here."
            checked={overrideDiscountPercent}
            onChange={(e) => setOverrideDiscountPercent(e.target.checked)}
            error={state?.errors?.override_discount_percent}
          />
          {overrideDiscountPercent && (
            <InputField
              type="number"
              id="discount_percent"
              label="Reseller margin"
              // helperText="Enter the margin % you are offering to DropCommerce resellers, which is their profit. If your product costs $100 and you offer a 35% discount, stores will pay you $65 for the product when sold. You can adjust prices manually later on a product level."
              defaultValue={product.discount_percent}
              placeholder="e.g. 20"
              error={state?.errors?.discount_percent}
              style="percentage"
            />
          )}
        </FormSection>
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end">
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
}
