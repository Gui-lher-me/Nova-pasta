"use client";

import { Badge } from "@/components/badge";
import {
  Cell,
  IndexTable,
  Row,
  SelectionType,
  useIndexResourceState,
} from "@/components/index-table";
import { FileDownloader, formattedCurrency, formattedDate } from "@/lib/utils";
import { useConfirmationModal } from "@/providers/confirmation-modal-provider";
import Link from "next/link";
import { exportOrders } from "../server/actions/orders";

export function OrdersTable({ orders, storeId }) {
  const { openModal } = useConfirmationModal();

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const {
    selectedResources: selectedOrders,
    allResourcesSelected: allOrdersSelected,
    handleSelectionChange,
    clearSelection,
    isAllSelected,
  } = useIndexResourceState(orders);

  const rowMarkup = orders.map((order) => {
    // let text = "no suppliers";
    if (order.suppliers.length > 0) {
      // const noun = order.suppliers.length > 1 ? "suppliers" : "supplier";
      // text = order.suppliers.length + " " + noun;
    }
    return (
      <Row
        key={order.id}
        selected={selectedOrders.includes(order.id)}
        onChange={(checked) =>
          handleSelectionChange(SelectionType.Single, checked, order.id)
        }
      >
        <Cell>
          <p className="text-gray-600 dark:text-neutral-400">
            {order.name} ({order.new_name})
          </p>
        </Cell>
        <Cell>
          <p className="text-gray-800 dark:text-neutral-200">
            {formattedDate.format(new Date(order.created_at))}
          </p>
        </Cell>
        {/* <Cell>
          <p className="text-sm text-gray-600 dark:text-neutral-400">{text}</p>
        </Cell> */}
        <Cell>
          <Badge status={getOrderStatus(order.status)}>{order.status}</Badge>
        </Cell>
        <Cell>
          <p className="text-end text-gray-800 dark:text-neutral-200">
            {formattedCurrency.format(order.total)}
          </p>
        </Cell>
        <Cell>
          <p className="text-gray-600 dark:text-neutral-400">
            {order.shipping_address.first_name}
          </p>
        </Cell>
        <Cell>
          <Link
            className="inline-flex items-center gap-x-1 text-sm font-medium text-primary-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-primary-500"
            href={`/store/${storeId}/orders/${order.id}/details`}
          >
            View details
          </Link>
        </Cell>
      </Row>
    );
  });

  const promotedBulkActions = [
    {
      content: "Export order(s)",
      content: `Export ${selectedOrders.length} order${selectedOrders.length !== 1 ? "s" : ""}`,
      onAction: () =>
        openModal({
          title: "Export order(s)",
          destructive: false,
          primaryActionContent: "Export",
          onPrimaryAction: () => exportOrders(selectedOrders),
          description: "Are you sure you want to export the selected order(s)?",
          onSuccess: (response) => {
            if (!response.url) {
              console.error("Invalid response provided.");
              return;
            }
            downloadFile(response);
            clearSelection();
          },
        }),
    },
  ];

  return (
    <IndexTable
      resourceName={resourceName}
      itemCount={orders.length}
      selectedItemsCount={allOrdersSelected ? "All" : selectedOrders.length}
      onSelectionChange={() =>
        handleSelectionChange(SelectionType.All, !isAllSelected)
      }
      promotedBulkActions={promotedBulkActions}
      headings={[
        { title: "Order" },
        { title: "Date" },
        // { title: "Suppliers" },
        { title: "Status" },
        { title: "Total", alignment: "end" },
        { title: "Customer" },
        { title: "" },
      ]}
      isAllSelected={isAllSelected}
    >
      {rowMarkup}
    </IndexTable>
  );
}

export function getOrderStatus(status) {
  switch (status) {
    case "paid": {
      return "loading";
    }
    case "unpaid": {
      return "warning";
    }
    case "partial": {
      return "disabled";
    }
    case "canceled": {
      return "error";
    }
    case "shipped": {
      return "success";
    }
    default: {
      console.log(
        `Invalid status: ${status}. Expected one of "paid", "unpaid", "partial", "canceled", or "shipped".`,
      );
      return "unknown";
    }
  }
}

async function downloadFile(response) {
  try {
    // Create an instance of the statically imported class
    const fileDownloader = new FileDownloader(response);

    // Use the class method to download the file
    fileDownloader.downloadFile();
  } catch (error) {
    console.error("Error while downloading the file:", error);
  }
}
