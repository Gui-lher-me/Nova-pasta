import { Paper } from "@/components/paper";
import { Table } from "@/components/table";
import Link from "next/link";
import { MetricsTableToolbar } from "./metrics-table-toolbar";

export function MetricsTable({ data }) {
  const { results: metrics } = data;

  const headings = ["Path", "Sessions", "p75", ""];

  const resourceName = {
    singular: "metric",
    plural: "metrics",
  };

  const rowsMarkup = metrics.map((metric) => (
    <Table.Row key={metric.id}>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {metric.path}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {metric.sessions}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {(metric.p75 / 1000).toFixed(2)}
        </span>
      </Table.Cell>
      <Table.Cell>
        <Link
          className="inline-flex items-center gap-x-1 text-sm font-medium text-primary-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-primary-500"
          href={`metrics/${metric.id}/details`}
        >
          View details
        </Link>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Paper>
      <MetricsTableToolbar />
      <Table
        resourceName={resourceName}
        headings={headings}
        itemCount={metrics.length}
      >
        {rowsMarkup}
      </Table>
    </Paper>
  );
}
