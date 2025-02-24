import { Badge } from "@/components/badge";
import { Paper } from "@/components/paper";
import { Table } from "@/components/table";
import { TablePagination } from "@/components/table-pagination";
import { notFoundImageUrl } from "@/constants";
import { CheckIcon, MinusIcon } from "@/icons";
import { formattedCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { getProductLabel, getProductStatus } from "../utils/products";
import { ProductsTableToolbar } from "./products-table-toolbar";

export function ProductsTable({ data }) {
  const {
    products,
    pagination: { pages: totalPages },
  } = data;

  const headings = [
    "Product",
    "Reseller price",
    "Retail price",
    "Profit",
    "Profit with shipping",
    "Status",
    "Inventory sync",
    "",
  ];

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const rowsMarkup = products.map((product) => (
    <Table.Row key={product.id}>
      <Table.Cell>
        <div className="flex items-center gap-x-4">
          <Image
            width={38}
            height={38}
            className="size-[38px] flex-shrink-0 rounded-lg object-cover"
            src={product.image ?? notFoundImageUrl}
            alt={`${product.title} image`}
          />
          <div>
            <span className="block max-w-44 truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
              {product.title}
            </span>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {formattedCurrency.format(product.price)}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {formattedCurrency.format(product.retail_price)}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {formattedCurrency.format(product.profit)}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {formattedCurrency.format(product.profit_with_shipping)}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          <Badge status={getProductStatus(product.status)}>
            {getProductLabel(product.status)}
          </Badge>
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {product.track_inventory ? <CheckIcon /> : <MinusIcon />}
        </span>
      </Table.Cell>
      <Table.Cell>
        <Link
          className="inline-flex items-center gap-x-1 text-sm font-medium text-primary-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-primary-500"
          href={`/products/${product.id}/edit`}
        >
          View details
        </Link>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Paper>
      <ProductsTableToolbar />
      <Table
        resourceName={resourceName}
        headings={headings}
        itemCount={products.length}
      >
        {rowsMarkup}
      </Table>
      {totalPages >= 1 && <TablePagination totalPages={totalPages} />}
    </Paper>
  );
}
