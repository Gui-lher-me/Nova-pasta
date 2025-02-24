"use client";

import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { useFormState } from "react-dom";
import { saveVariants } from "../../server/actions/products";

export function EditVariantsForm({ product }) {
  const [state, formAction] = useFormState(
    saveVariants.bind(null, product.id),
    undefined,
  );

  return (
    <form action={formAction}>
      <div>
        <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
          {product.variants.map((variant) => (
            <div key={variant.id} className="sm:col-span-12">
              <div className="sm:flex">
                <input
                  id={`variant_${variant.id}_name`}
                  name={`variant_${variant.id}_name`}
                  type="text"
                  className="variant-input"
                  placeholder="Name"
                  defaultValue={variant.name}
                />
                <input
                  id={`variant_${variant.id}_sku`}
                  name={`variant_${variant.id}_sku`}
                  type="text"
                  className="variant-input"
                  placeholder="SKU"
                  defaultValue={variant.sku}
                />
                <input
                  step="1"
                  id={`variant_${variant.id}_quantity`}
                  name={`variant_${variant.id}_quantity`}
                  type="number"
                  className="variant-input"
                  placeholder="Quantity"
                  defaultValue={variant.quantity}
                />
                <input
                  step="0.01"
                  id={`variant_${variant.id}_price`}
                  name={`variant_${variant.id}_price`}
                  type="number"
                  className="variant-input"
                  placeholder="Reseller price"
                  defaultValue={variant.price}
                />
                <input
                  step="0.01"
                  id={`variant_${variant.id}_retailPrice`}
                  name={`variant_${variant.id}_retailPrice`}
                  type="number"
                  className="variant-input"
                  placeholder="Retail price"
                  defaultValue={variant.retailPrice}
                />
                <select
                  defaultValue={variant.active ? "active" : "inactive"}
                  name={`variant_${variant.id}_status`}
                  className="relative -ms-px -mt-px block w-full border-gray-200 px-3 py-2 pe-9 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-primary-500 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 sm:mt-0 sm:w-auto sm:first:ms-0 sm:first:rounded-s-lg sm:first:rounded-se-none sm:last:rounded-e-lg sm:last:rounded-es-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <>
                {state?.errors?.["variants"]?.[variant.id]?.name && (
                  <p aria-live="polite" className="sr-only">
                    {state?.errors?.["variants"]?.[variant.id]?.name}
                  </p>
                )}
                {state?.errors?.["variants"]?.[variant.id]?.name && (
                  <p
                    className="mt-2 text-xs text-red-600"
                    id={`${variant.id}-error`}
                  >
                    {state?.errors?.["variants"]?.[variant.id]?.name}
                  </p>
                )}
              </>
              <>
                {state?.errors?.["variants"]?.[variant.id]?.sku && (
                  <p aria-live="polite" className="sr-only">
                    {state?.errors?.["variants"]?.[variant.id]?.sku}
                  </p>
                )}
                {state?.errors?.["variants"]?.[variant.id]?.sku && (
                  <p
                    className="mt-2 text-xs text-red-600"
                    id={`${variant.id}-error`}
                  >
                    {state?.errors?.["variants"]?.[variant.id]?.sku}
                  </p>
                )}
              </>
              <>
                {state?.errors?.["variants"]?.[variant.id]?.quantity && (
                  <p aria-live="polite" className="sr-only">
                    {state?.errors?.["variants"]?.[variant.id]?.quantity}
                  </p>
                )}
                {state?.errors?.["variants"]?.[variant.id]?.quantity && (
                  <p
                    className="mt-2 text-xs text-red-600"
                    id={`${variant.id}-error`}
                  >
                    {state?.errors?.["variants"]?.[variant.id]?.quantity}
                  </p>
                )}
              </>
              <>
                {state?.errors?.["variants"]?.[variant.id]?.price && (
                  <p aria-live="polite" className="sr-only">
                    {state?.errors?.["variants"]?.[variant.id]?.price}
                  </p>
                )}
                {state?.errors?.["variants"]?.[variant.id]?.price && (
                  <p
                    className="mt-2 text-xs text-red-600"
                    id={`${variant.id}-error`}
                  >
                    {state?.errors?.["variants"]?.[variant.id]?.price}
                  </p>
                )}
              </>
              <>
                {state?.errors?.["variants"]?.[variant.id]?.retailPrice && (
                  <p aria-live="polite" className="sr-only">
                    {state?.errors?.["variants"]?.[variant.id]?.retailPrice}
                  </p>
                )}
                {state?.errors?.["variants"]?.[variant.id]?.retailPrice && (
                  <p
                    className="mt-2 text-xs text-red-600"
                    id={`${variant.id}-error`}
                  >
                    {state?.errors?.["variants"]?.[variant.id]?.retailPrice}
                  </p>
                )}
              </>
            </div>
          ))}
        </div>
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end">
        <SubmitButton>Save changes</SubmitButton>
      </div>
    </form>
  );
}
