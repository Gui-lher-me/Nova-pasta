"use client";

import { CheckboxField } from "@/components/checkbox-field";
import { InputField } from "@/components/input-field";
import { SelectField } from "@/components/select-field";
import { SubmitButton } from "@/components/submit-button";
import { SwitchField } from "@/components/switch-field";
import { Toast } from "@/components/toast";
import { countryOptions } from "@/constants";
import { useState } from "react";
import { useFormState } from "react-dom";
import { shipping } from "../../server/actions/shippings";

export function ShippingForm({
  supplierCountry,
  defaultValues,
  productId,
  isAttachedToProduct,
}) {
  const [state, formAction] = useFormState(
    shipping.bind(
      null,
      supplierCountry,
      defaultValues?.id,
      productId,
      isAttachedToProduct,
    ),
    undefined,
  );

  const [toCountry, setToCountry] = useState(defaultValues?.to_country);

  const excludedRegions = defaultValues?.excluded_regions?.split(",");

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <SelectField
          id="to_country"
          label="Country"
          options={countryOptions}
          value={toCountry}
          onChange={(e) => setToCountry(e.target.value)}
          tooltip="Add shipping settings for this specific country"
          error={state?.errors?.to_country}
          // disabled={defaultValues?.to_country !== undefined}
        />
        {toCountry === "US" && (
          <>
            <CheckboxField
              id="exclude_hi"
              label="Exclude Hawaii"
              defaultChecked={excludedRegions?.includes("HI")}
            />
            <CheckboxField
              id="exclude_ak"
              label="Exclude Alaska"
              defaultChecked={excludedRegions?.includes("AK")}
            />
            <CheckboxField
              id="exclude_pr"
              label="Exclude Puerto Rico"
              defaultChecked={excludedRegions?.includes("PR")}
            />
          </>
        )}
        <InputField
          step="0.01"
          type="number"
          id="price"
          label="First item price"
          defaultValue={defaultValues?.price}
          placeholder="e.g. 5"
          tooltip="The shipping rate charged for the first item in an order. If product shipping rates vary, the most expensive will be charged"
          style="currency"
          error={state?.errors?.price}
        />
        <InputField
          step="0.01"
          type="number"
          id="additional_item_shipping_rate"
          label="Additional items price"
          defaultValue={defaultValues?.additional_item_shipping_rate}
          placeholder="e.g. 3"
          tooltip="For a flat rate per order, enter '0' or leave it empty. Otherwise, specify the shipping rate for additional items beyond the first"
          style="currency"
          error={state?.errors?.additional_item_shipping_rate}
        />
        <InputField
          type="text"
          id="carrier"
          label="Shipping carrier"
          defaultValue={defaultValues?.carrier}
          placeholder="e.g. UPS, FedEx, DHL, etc"
          tooltip="The shipping carrier you use for this shipping region"
          error={state?.errors?.carrier}
        />
        <InputField
          type="number"
          id="delivery_days_min"
          label="Delivery days min"
          defaultValue={defaultValues?.delivery_days_min}
          placeholder="e.g. 2"
          tooltip="The minimum estimate for the delivery time of orders"
          error={state?.errors?.delivery_days_min}
        />
        <InputField
          type="number"
          id="delivery_days_max"
          label="Delivery days max"
          defaultValue={defaultValues?.delivery_days_max}
          placeholder="e.g. 9"
          tooltip="The maximum estimate for the delivery time of orders"
          error={state?.errors?.delivery_days_max}
        />
        {defaultValues !== undefined && (
          <SwitchField
            id="deactivated"
            label="Deactivate shipping rate"
            helperText="Turn this option on to mark this shipping rate as inactive"
            defaultChecked={!!defaultValues.deactivated}
          />
        )}
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end gap-x-2">
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
}
