import { Badge } from "@/components/badge";
import { Paper } from "@/components/paper";
import { Table } from "@/components/table";
import { formattedCurrency } from "@/lib/utils";
import Link from "next/link";
import { getShippingLabel, getShippingStatus } from "../utils/shippings";

export function ShippingsTable({ shippings, productId }) {
  const headings = [
    "Country",
    "Carrier",
    "Price",
    "Delivery days",
    "Status",
    "",
  ];

  const resourceName = {
    singular: "shipping rate",
    plural: "shipping rates",
  };

  const rowsMarkup = shippings.map((shipping) => (
    <Table.Row key={shipping.id}>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {shipping.country_name}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {shipping.carrier || "no carrier specified"}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {formattedCurrency.format(shipping.price)}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {shipping.delivery_days}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          <Badge status={getShippingStatus(shipping.deactivated)}>
            {getShippingLabel(shipping.deactivated)}
          </Badge>
        </span>
      </Table.Cell>
      <Table.Cell>
        <Link
          className="inline-flex items-center gap-x-1 text-sm font-medium text-primary-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-primary-500"
          href={`shippings/${shipping.id}/edit${productId !== undefined ? `/?product_id=${productId}` : ""}`}
        >
          Edit
        </Link>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Paper>
      <Table
        resourceName={resourceName}
        headings={headings}
        itemCount={shippings.length}
      >
        {rowsMarkup}
      </Table>
    </Paper>
  );
}
