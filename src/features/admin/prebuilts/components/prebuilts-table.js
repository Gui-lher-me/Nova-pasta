import { Paper } from "@/components/paper";
import { SearchField } from "@/components/search-field";
import { Table } from "@/components/table";
import { TablePagination } from "@/components/table-pagination";
import { TableToolbar } from "@/components/table-toolbar";
import { PrebuiltStatusFilter } from "@/features/admin/prebuilts/components/prebuilt-status-filter";
import Link from "next/link";

export function PrebuiltsTable({ data }) {
  const { results: prebuilts, next, count } = data;

  const headings = ["Store Type", "URL", "Date", "Steps"];

  const resourceName = {
    singular: "Prebuilt Store",
    plural: "Prebuilt Stores",
  };

  const rowsMarkup = prebuilts.map((prebuilt) => (
    <Table.Row key={prebuilt.id}>
      <Table.Cell>
        <span className="block max-w-44 truncate text-sm text-gray-600 dark:text-neutral-400">
          {prebuilt.store_type}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {prebuilt.url}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {new Date(prebuilt.date).toDateString()}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {`${prebuilt.steps.reduce((a, item) => a + (item === true ? 1 : 0), 0)} / 7`}
        </span>
      </Table.Cell>
      <Table.Cell>
        <Link
          className="inline-flex items-center gap-x-1 text-sm font-medium text-primary-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-primary-500"
          href={`/admin/prebuilts/${prebuilt.id}/`}
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
          <PrebuiltStatusFilter />
        </div>
      </TableToolbar>
      <Table
        resourceName={resourceName}
        headings={headings}
        itemCount={prebuilts.length}
      >
        {rowsMarkup}
      </Table>
      <TablePagination hasNextPage={!!next} totalPages={count} />
    </Paper>
  );
}
