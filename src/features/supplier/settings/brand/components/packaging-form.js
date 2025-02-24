"use client";

import { FormSection } from "@/components/form-section";
import { SubmitButton } from "@/components/submit-button";
import { SwitchField } from "@/components/switch-field";
import { TextareaField } from "@/components/textarea-field";
import { Toast } from "@/components/toast";
import { useState } from "react";
import { useFormState } from "react-dom";
import { packaging } from "../server/actions/brand";

export function PackagingForm({ settings }) {
  const [whiteLabel, setWhiteLabel] = useState(settings.white_label);
  const [state, formAction] = useFormState(packaging, undefined);

  return (
    <form action={formAction}>
      <div>
        <FormSection title="Packaging & branding">
          <SwitchField
            id="white_label"
            label="Offer white labeling"
            helperText="You are able to offer white labeling (adding the store's branding or info) to the product or to the packaging."
            checked={whiteLabel}
            onChange={(e) => setWhiteLabel(e.target.checked)}
            error={state?.errors?.white_label}
          />
          {whiteLabel && (
            <>
              <SwitchField
                id="white_label_packaging"
                label="Packaging"
                helperText="You are able to white label product packaging."
                defaultChecked={settings.white_label_packaging}
                error={state?.errors?.white_label_packaging}
              />
              <SwitchField
                id="white_label_product"
                label="Product"
                helperText="You are able to white label the products themselves."
                defaultChecked={settings.white_label_product}
                error={state?.errors?.white_label_product}
              />
            </>
          )}
          <SwitchField
            id="branded_invoicing"
            label="Branded invoicing"
            helperText="You commit to printing out the DropCommerce-provided invoice/packing slip for each order and including it in the shipment."
            defaultChecked={settings.branded_invoicing}
            error={state?.errors?.branded_invoicing}
          />
        </FormSection>
        <FormSection
          title="Branding / packaging description"
          description="Please explain exactly what customers should expect to see in a shipment like whether or not your branding, contact information or other information will be visible to the customer within the package."
        >
          <SwitchField
            id="branding_on_product"
            label="Branding on Product"
            helperText="Indicate if your branding or contact information is visible on the product itself."
            defaultChecked={settings.branding_on_product}
            error={state?.errors?.branding_on_product}
          />
          <SwitchField
            id="branding_on_packaging"
            label="Branding on Packaging"
            helperText="Indicate if your branding or contact information is visible on the packaging of the product."
            defaultChecked={settings.branding_on_packaging}
            error={state?.errors?.branding_on_packaging}
          />
          <SwitchField
            id="branding_on_box"
            label="Branding on Shipping Box"
            helperText="Indicate if your branding or contact information is visible on the shipping box used for the product."
            defaultChecked={settings.branding_on_box}
            error={state?.errors?.branding_on_box}
          />
          <SwitchField
            id="branding_on_anything"
            label="Branding on Other Items"
            helperText="Indicate if your branding or contact information is included on any other items related to the shipment."
            defaultChecked={settings.branding_on_anything}
            error={state?.errors?.branding_on_anything}
          />
          <SwitchField
            id="branding_no_promo"
            label="No Additional Promo Content"
            helperText="Confirm that no extra promotional content, such as coupons or thank you cards, will be included with the shipment."
            defaultChecked={settings.branding_no_promo}
            error={state?.errors?.branding_no_promo}
          />
          <TextareaField
            id="branding_description"
            label="Description"
            placeholder="Enter description..."
            defaultValue={settings.branding_description}
            error={state?.errors?.branding_description}
          />
        </FormSection>
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end gap-x-2">
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
}
