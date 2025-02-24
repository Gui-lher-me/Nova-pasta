import { Badge } from "@/components/badge";
import { Paper } from "@/components/paper";
import { SearchField } from "@/components/search-field";
import { Table } from "@/components/table";
import { TablePagination } from "@/components/table-pagination";
import { TableToolbar } from "@/components/table-toolbar";
import { formattedDate } from "@/lib/utils";
import Link from "next/link";
import { getOrderLabel, getOrderStatus } from "../utils/orders";
import { OrderStatusFilter } from "./order-status-filter";

export function OrdersTable({ data }) {
  const {
    supplier_orders: orders,
    pagination: { pages: totalPages },
  } = data;

  const headings = ["Name", "Date received", "Status", "Customer"];

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const rowsMarkup = orders.map((order) => (
    <Table.Row key={order.id}>
      <Table.Cell>
        <span className="py-2 pe-6">
          <Link
            className="text-sm text-primary-500 decoration-2 hover:underline"
            href={`/orders/${order.id}/edit`}
          >
            {order.name}
          </Link>
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {formattedDate.format(new Date(order.created_at))}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          <Badge status={getOrderStatus(order.status)}>
            {getOrderLabel(order.status)}
          </Badge>
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {order.customer}
        </span>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Paper>
      <TableToolbar>
        <SearchField />
        <OrderStatusFilter />
      </TableToolbar>
      <Table
        resourceName={resourceName}
        headings={headings}
        itemCount={orders.length}
      >
        {rowsMarkup}
      </Table>
      {totalPages > 1 && <TablePagination totalPages={totalPages} />}
    </Paper>
  );
}
