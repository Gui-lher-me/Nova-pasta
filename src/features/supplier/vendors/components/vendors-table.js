import { Badge } from "@/components/badge";
import { Paper } from "@/components/paper";
import { Table } from "@/components/table";
import { TablePagination } from "@/components/table-pagination";
import { formattedDate } from "@/lib/utils";
import Link from "next/link";
import { getVendorLabel, getVendorStatus } from "../utils/vendors";
import { VendorsTableToolbar } from "./vendors-table-toolbar";

export function VendorsTable({ data }) {
  const {
    vendors,
    pagination: { pages: totalPages },
  } = data;

  const headings = ["Name", "Status", "Joined", ""];

  const resourceName = {
    singular: "vendor",
    plural: "vendors",
  };

  const rowsMarkup = vendors.map((vendor) => (
    <Table.Row key={vendor.id}>
      <Table.Cell>
        <span className="block max-w-44 truncate text-sm text-gray-600 dark:text-neutral-400">
          {vendor.name}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          <Badge status={getVendorStatus(vendor.status)}>
            {getVendorLabel(vendor.status)}
          </Badge>
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {formattedDate.format(new Date(vendor.date))}
        </span>
      </Table.Cell>
      <Table.Cell>
        <Link
          className="inline-flex items-center gap-x-1 text-sm font-medium text-primary-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-primary-500"
          href={`/vendors/${vendor.id}/edit`}
        >
          View details
        </Link>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Paper>
      <VendorsTableToolbar />
      <Table
        resourceName={resourceName}
        headings={headings}
        itemCount={vendors.length}
      >
        {rowsMarkup}
      </Table>
      {totalPages > 1 && <TablePagination totalPages={totalPages} />}
    </Paper>
  );
}
