import { Tooltip } from "@/components/tooltip";
import { formattedCurrency } from "@/lib/utils";

export function OrderFooter({
  note,
  shippingCharge,
  subtotal,
  total,
  stripeFee,
  payoutAmount,
}) {
  return (
    <>
      {note && (
        <div className="mt-8 sm:mt-12">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
            Notes
          </h4>
          <p className="text-gray-500 dark:text-neutral-500">{note}</p>
        </div>
      )}
      <div className="mt-8 flex sm:justify-end">
        <div className="w-full max-w-2xl space-y-2 sm:text-end">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
            <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
              <dt className="col-span-3 pr-4 text-gray-500 dark:text-neutral-500">
                Subtotal:
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                {formattedCurrency.format(subtotal)}
              </dd>
            </dl>
            <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
              <dt className="col-span-3 pr-4 text-gray-500 dark:text-neutral-500">
                Total:
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                {formattedCurrency.format(total)}
              </dd>
            </dl>
            <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
              <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                Fee:
                <Tooltip preferredPosition="above">
                  The fee our payment processor Stripe takes from the
                  transaction. DropCommerce does not take any commission or
                  profit on orders
                </Tooltip>
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                {formattedCurrency.format(stripeFee)}
              </dd>
            </dl>
            <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
              <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                Amount paid:
                <Tooltip preferredPosition="above">
                  The final amount you were paid after Stripe transaction fees.
                  DropCommerce does not take any commission or profit on orders
                </Tooltip>
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                {formattedCurrency.format(payoutAmount)}
              </dd>
            </dl>
            <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
              <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                Shipping charged:
                <Tooltip preferredPosition="above">
                  Shipping charged = First item&apos;s shipping rate + Reduced
                  shipping rate per additional item
                </Tooltip>
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                {formattedCurrency.format(shippingCharge)}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
