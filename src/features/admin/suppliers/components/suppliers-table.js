import { Badge } from "@/components/badge";
import { Paper } from "@/components/paper";
import { SearchField } from "@/components/search-field";
import { Table } from "@/components/table";
import { TablePagination } from "@/components/table-pagination";
import { TableToolbar } from "@/components/table-toolbar";
import { getSupplierLabel, getSupplierStatus } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SupplierStatusFilter } from "./supplier-status-filter";

export function SuppliersTable({ data }) {
  const { results: suppliers, next } = data;

  const headings = ["Id", "Supplier", "Status", "Issues", ""];

  const resourceName = {
    singular: "supplier",
    plural: "suppliers",
  };

  const rowsMarkup = suppliers.map((supplier) => (
    <Table.Row key={supplier.id}>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {supplier.id}
        </span>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-x-3">
          <Image
            className="inline-block size-[38px] rounded-full object-cover"
            src={
              supplier.image ??
              "https://res.cloudinary.com/dropcommerce/image/upload/h_350/v1726695690/znmuh66nd7iurusfqf0r.jpg"
            }
            alt={`${supplier.name}'s image`}
            width={38}
            height={38}
          />
          <div className="grow">
            <span className="block max-w-44 truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
              {supplier.name}
            </span>
            <span className="block text-sm text-gray-500 dark:text-neutral-500">
              {supplier.shopify_url}
            </span>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          <Badge status={getSupplierStatus(supplier.status)}>
            {getSupplierLabel(supplier.status)}
          </Badge>
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {supplier.issues}
        </span>
      </Table.Cell>
      <Table.Cell>
        <Link
          className="inline-flex items-center gap-x-1 text-sm font-medium text-primary-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-primary-500"
          href={`/admin/suppliers/${supplier.id}/profile`}
        >
          View details
        </Link>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Paper>
      <TableToolbar>
        <SearchField />
        <div className="flex gap-x-2">
          <SupplierStatusFilter />
        </div>
      </TableToolbar>
      <Table
        resourceName={resourceName}
        headings={headings}
        itemCount={suppliers.length}
      >
        {rowsMarkup}
      </Table>
      <TablePagination hasNextPage={!!next} />
    </Paper>
  );
}
