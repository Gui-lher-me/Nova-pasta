import { Badge } from "@/components/badge";
import { formattedDate } from "@/lib/utils";
import { getOrderLabel, getOrderStatus } from "../utils/orders";
import { OrderActions } from "./order-actions";

export function OrderDetails({
  name,
  status,
  packingSlip,
  createdAt,
  shippingAddress,
}) {
  return (
    <>
      <div className="mb-5 flex flex-col justify-between gap-y-2 border-b border-gray-200 pb-5 dark:border-neutral-700 sm:flex-row sm:items-center">
        <div className="flex gap-x-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">
            {name}
          </h2>
          <Badge status={getOrderStatus(status)}>{getOrderLabel(status)}</Badge>
        </div>
        <OrderActions
          showPrimaryButton={status === "paid"}
          packingSlip={packingSlip}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <div className="grid space-y-3">
            <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
              <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                Shipping details:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-neutral-200">
                <span className="block font-semibold">
                  {shippingAddress.name}
                </span>
                <address className="font-normal not-italic">
                  {shippingAddress.address1},
                  <br />
                  {shippingAddress.city},
                  <br />
                  {shippingAddress.province},
                  <br />
                  {shippingAddress.country},
                  <br />
                  {shippingAddress.zip}
                  <br />
                </address>
              </dd>
            </dl>
          </div>
        </div>
        <div>
          <div className="grid space-y-3">
            <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
              <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                Currency:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-neutral-200">
                USD - US Dollar
              </dd>
            </dl>
            <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
              <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                Date received:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-neutral-200">
                {formattedDate.format(new Date(createdAt))}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
