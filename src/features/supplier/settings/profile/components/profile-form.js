"use client";

import { FormSection } from "@/components/form-section";
import { InputField } from "@/components/input-field";
import { SubmitButton } from "@/components/submit-button";
import { SwitchField } from "@/components/switch-field";
import { TextareaField } from "@/components/textarea-field";
import { Toast } from "@/components/toast";
import { useState } from "react";
import { useFormState } from "react-dom";
import { profile } from "../server/actions/profile";

export function ProfileForm({ settings }) {
  const [state, formAction] = useFormState(profile, undefined);

  const [syncPricing, setSyncPricing] = useState(settings.sync_pricing);

  return (
    <form action={formAction}>
      <div>
        <FormSection title="Profile details">
          <InputField
            type="number"
            id="product_count"
            label="Product count"
            defaultValue={settings.product_count}
            placeholder="e.g. 200"
            readOnly
            tooltip="Read only"
          />
          <InputField
            type="email"
            id="email"
            label="Email"
            defaultValue={settings.email}
            placeholder="e.g. john.doe@example.com"
            readOnly
            tooltip="Please contact support to update this information"
          />
          <InputField
            type="tel"
            id="phone"
            label="Phone"
            defaultValue={settings.phone}
            placeholder="+x(xxx)xxx-xx-xx"
            readOnly
            tooltip="Please contact support to update this information"
          />
          <InputField
            type="text"
            id="subdomain"
            label="Subdomain"
            defaultValue={settings.subdomain}
            placeholder="e.g. support"
            readOnly
            tooltip="Please contact support to update this information"
          />
          <InputField
            type="text"
            id="website"
            label="Website"
            defaultValue={settings.website}
            placeholder="e.g. https://www.example.com"
            error={state?.errors?.website}
          />
        </FormSection>
        <FormSection title="About">
          <InputField
            type="text"
            id="short_description"
            label="Short description"
            defaultValue={settings.short_description}
            placeholder="Enter your short description here"
            error={state?.errors?.short_description}
          />
          <TextareaField
            label="Description"
            id="description"
            placeholder="e.g. This is a brief description of the product, highlighting its key features, benefits, and any other relevant details that would entice a potential buyer."
            error={state?.errors?.description}
            defaultValue={settings.description}
            disabled={false}
          />
          <TextareaField
            label="Return policy"
            id="return_policy"
            placeholder="Enter your return policy here"
            error={state?.errors?.return_policy}
            defaultValue={settings.return_policy}
            disabled={false}
          />
        </FormSection>
        <FormSection title="Sync info">
          <SwitchField
            id="auto_import"
            label="Sync new Shopify products"
            helperText="New products in your Shopify account will be auto-imported daily. Do not activate this if you have any products in Shopify that you do not want in DropCommerce."
            error={state?.errors?.auto_import}
            defaultChecked={settings.auto_import}
          />
          <SwitchField
            id="sync_inventory"
            label="Sync Shopify inventory"
            helperText="Inventory is synced from your Shopify account daily. Please ensure your inventory is accurate in Shopify."
            error={state?.errors?.sync_inventory}
            defaultChecked={settings.sync_inventory}
            tooltip="Inventory sync can be toggled on or off for individual products."
          />
          <SwitchField
            id="sync_pricing"
            label="Sync Shopify pricing"
            helperText="Product pricing is synced from your Shopify account daily, based on the 'reseller margin' field defined below."
            error={state?.errors?.sync_pricing}
            checked={syncPricing}
            onChange={(e) => setSyncPricing(e.target.checked)}
          />
          {syncPricing && (
            <>
              <InputField
                type="number"
                id="discount"
                label="Reseller margin"
                helperText="Enter the margin percentage you are offering to DropCommerce resellers, which is their profit. If your product costs $100 and you offer a 35% discount, stores will pay you $65 for the product when sold. You can adjust prices manually later on a product level."
                defaultValue={settings.discount}
                placeholder="e.g. 20"
                error={state?.errors?.discount}
                style="percentage"
                // disabled={!syncPricing}
              />
              <SwitchField
                id="use_compare_at_price"
                label="Use compare at price"
                helperText="When pricing syncs we'll use the 'compare at price' instead. This allows you to change your prices without changing DropCommerce's margin."
                error={state?.errors?.use_compare_at_price}
                defaultChecked={settings.use_compare_at_price}
                // disabled={!syncPricing}
              />
            </>
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
