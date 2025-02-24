"use client";

import { Badge } from "@/components/badge";
import {
  Cell,
  IndexTable,
  Row,
  SelectionType,
  useIndexResourceState,
} from "@/components/index-table";
import { notFoundImageUrl } from "@/constants";
import { formattedCurrency } from "@/lib/utils";
import { useConfirmationModal } from "@/providers/confirmation-modal-provider";
import Image from "next/image";
import Link from "next/link";
import { deleteProducts, pushProducts } from "../server/actions/imports";

export function ProductsTable({ products }) {
  const { openModal } = useConfirmationModal();

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const {
    selectedResources: selectedProducts,
    allResourcesSelected: allProductsSelected,
    handleSelectionChange,
    clearSelection,
    isAllSelected,
  } = useIndexResourceState(products);

  const rowMarkup = products.map((product) => (
    <Row
      key={product.id}
      selected={selectedProducts.includes(product.id)}
      onChange={(checked) =>
        handleSelectionChange(SelectionType.Single, checked, product.id)
      }
    >
      <Cell>
        <div className="size-[56px] flex-shrink-0">
          <Image
            width={56}
            height={56}
            className="size-[100%] rounded-lg object-cover"
            src={product.image ?? notFoundImageUrl}
            alt={`${product.title} image`}
          />
        </div>
      </Cell>
      <Cell className="max-w-72">
        <p className="truncate md:text-wrap">{product.title}</p>
      </Cell>
      <Cell>
        <p className="text-end">{formattedCurrency.format(product.price)}</p>
      </Cell>
      <Cell>
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          {product.supplier.name}
        </p>
      </Cell>
      <Cell>
        <p className="text-end">{product.quantity}</p>
      </Cell>
      <Cell>
        <Badge status={getStatus(product.status)}>
          {getLabel(product.status)}
        </Badge>
      </Cell>
      <Cell>
        <Link
          className="inline-flex items-center gap-x-1 text-sm font-medium text-primary-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-primary-500"
          href={`imports/${product.id}/details`}
        >
          Edit
        </Link>
      </Cell>
    </Row>
  ));

  const promotedBulkActions = [
    {
      content: `Delete ${selectedProducts.length} product${selectedProducts.length !== 1 ? "s" : ""}`,
      onAction: () =>
        openModal({
          title: "Delete product(s)",
          primaryActionContent: "Delete",
          onPrimaryAction: () => deleteProducts(selectedProducts),
          description:
            "Are you sure you want to delete the selected product(s)?",
          onSuccess: clearSelection,
        }),
    },
    {
      content: `Push ${selectedProducts.length} product${selectedProducts.length !== 1 ? "s" : ""}`,
      onAction: () =>
        openModal({
          title: "Push product(s)",
          destructive: false,
          primaryActionContent: "Push",
          onPrimaryAction: () => pushProducts(selectedProducts),
          description: "Are you sure you want to push the selected product(s)?",
          onSuccess: clearSelection,
        }),
    },
  ];

  return (
    <IndexTable
      resourceName={resourceName}
      itemCount={products.length}
      selectedItemsCount={allProductsSelected ? "All" : selectedProducts.length}
      onSelectionChange={() =>
        handleSelectionChange(SelectionType.All, !isAllSelected)
      }
      promotedBulkActions={promotedBulkActions}
      headings={[
        { title: "Image" },
        { title: "Title" },
        { title: "Cost", alignment: "end" },
        { title: "Supplier" },
        { title: "Quantity", alignment: "end" },
        { title: "Status" },
        { title: "" },
      ]}
      isAllSelected={isAllSelected}
    >
      {rowMarkup}
    </IndexTable>
  );
}

function getStatus(status) {
  switch (status) {
    case "imported": {
      return "success";
    }
    case "error": {
      return "error";
    }
    case "in progress": {
      return "loading";
    }
    case "not imported": {
      return "warning";
    }
    default: {
      console.log(
        `Invalid status: ${status}. Expected one of "imported", "error", "in progress", or "not imported".`,
      );
      return "unknown";
    }
  }
}

function getLabel(status) {
  switch (status) {
    case "imported": {
      return "Imported";
    }
    case "error": {
      return "Error";
    }
    case "in progress": {
      return "In progress";
    }
    case "not imported": {
      return "Not imported";
    }
    default: {
      console.log(
        `Invalid status: ${status}. Expected one of "imported", "error", "in progress", or "not imported".`,
      );
      return "unknown";
    }
  }
}
