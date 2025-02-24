import { cn, formattedCurrency } from "@/lib/utils";
import Link from "next/link";

export function OrderItemsTable({ items }) {
  if (items.length === 0) return;
  return (
    <div className="mt-6 space-y-4 rounded-lg border border-gray-200 p-4 dark:border-neutral-700">
      <div className="hidden sm:grid sm:grid-cols-5">
        <div className="text-xs font-medium uppercase text-gray-500 dark:text-neutral-500 sm:col-span-2">
          Item
        </div>
        <div className="text-start text-xs font-medium uppercase text-gray-500 dark:text-neutral-500">
          Qty
        </div>
        <div className="text-start text-xs font-medium uppercase text-gray-500 dark:text-neutral-500">
          Price per item
        </div>
        <div className="text-end text-xs font-medium uppercase text-gray-500 dark:text-neutral-500">
          Shipping total
        </div>
      </div>
      <div className="hidden border-b border-gray-200 dark:border-neutral-700 sm:block" />
      {items.map((item) => {
        const showAdjustedShippingRate =
          item.adjusted_shipping_rate !== item.shipping_rate;

        return (
          <div key={item.id} className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            <div className="col-span-full sm:col-span-2">
              <h5 className="text-xs font-medium uppercase text-gray-500 dark:text-neutral-500 sm:hidden">
                Item
              </h5>
              <Link
                className="decoration-2 hover:underline focus:underline"
                href={`/products/${item.id}/edit`}
              >
                <p className="font-medium text-gray-800 dark:text-neutral-200">
                  {item.title}
                </p>
              </Link>
            </div>
            <div>
              <h5 className="text-xs font-medium uppercase text-gray-500 dark:text-neutral-500 sm:hidden">
                Qty
              </h5>
              <p className="text-gray-800 dark:text-neutral-200">
                {item.quantity}
              </p>
            </div>
            <div>
              <h5 className="text-xs font-medium uppercase text-gray-500 dark:text-neutral-500 sm:hidden">
                Price per item
              </h5>
              <p className="text-gray-800 dark:text-neutral-200">
                {formattedCurrency.format(item.price)}
              </p>
            </div>
            <div>
              <h5 className="text-xs font-medium uppercase text-gray-500 dark:text-neutral-500 sm:hidden">
                Shipping total
              </h5>
              <p
                className={cn(
                  "text-gray-800 dark:text-neutral-200 sm:text-end",
                  showAdjustedShippingRate
                    ? "text-red-500 line-through dark:text-red-500"
                    : "",
                )}
              >
                {formattedCurrency.format(item.shipping_rate)}
              </p>
              {showAdjustedShippingRate ? (
                <p className="text-gray-800 dark:text-neutral-200 sm:text-end">
                  {formattedCurrency.format(item.adjusted_shipping_rate)}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
