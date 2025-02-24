"use client";

import { Button } from "@/components/button";
import { EmptyStateIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function IndexTable({
  children,
  resourceName,
  itemCount,
  emptyState,
  selectedItemsCount,
  onSelectionChange,
  promotedBulkActions,
  headings,
  isAllSelected,
}) {
  const shouldShowActions =
    (selectedItemsCount > 0 || selectedItemsCount === "All") &&
    promotedBulkActions &&
    promotedBulkActions.length > 0;

  if (itemCount === 0)
    return emptyState ?? <EmptyState resourceName={resourceName} />;

  return (
    <>
      {shouldShowActions && (
        <div className="flex justify-end gap-x-2 px-4 py-3">
          {promotedBulkActions.map((action, idx) => (
            <Button key={idx} variant="outline" onClick={action.onAction}>
              {action.content}
            </Button>
          ))}
        </div>
      )}
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead className="bg-gray-50 dark:bg-neutral-700">
            <tr>
              <th scope="col" className="px-4 py-3 pe-0">
                <div className="flex h-5 items-center">
                  <input
                    id="hs-table-pagination-checkbox-all"
                    checked={isAllSelected}
                    onChange={() => onSelectionChange()}
                    type="checkbox"
                    className="rounded border-gray-200 text-primary-600 focus:ring-primary-500 dark:border-neutral-500 dark:bg-neutral-700 dark:checked:border-primary-500 dark:checked:bg-primary-500 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="hs-table-pagination-checkbox-all"
                    className="sr-only"
                  >
                    Checkbox
                  </label>
                </div>
              </th>
              {headings.map((heading, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-xs font-medium uppercase text-gray-500 dark:text-neutral-500 ${
                    heading.alignment === "end" ? "text-right" : "text-left"
                  }`}
                >
                  {heading.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
            {children}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function Row({ children, selected, onChange }) {
  return (
    <tr>
      <td className="py-3 ps-4">
        <div className="flex h-5 items-center">
          <input
            id="hs-table-pagination-checkbox-1"
            type="checkbox"
            checked={selected} // Check individual checkbox based on selection
            onChange={(e) => onChange(e.target.checked)} // Handle individual checkbox click
            className="rounded border-gray-200 text-primary-600 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-primary-500 dark:checked:bg-primary-500 dark:focus:ring-offset-gray-800"
          />
          <label htmlFor="hs-table-pagination-checkbox-1" className="sr-only">
            Checkbox
          </label>
        </div>
      </td>
      {children}
    </tr>
  );
}

export function Cell({ children, className }) {
  return (
    <td className={cn("whitespace-nowrap px-6 py-4 text-sm", className)}>
      {children}
    </td>
  );
}

export const SelectionType = {
  Single: "SINGLE",
  All: "ALL",
};

export function useIndexResourceState(resources) {
  const [selectedResources, setSelectedResources] = useState([]);
  const [allResourcesSelected, setAllResourcesSelected] = useState(false);

  const handleSelectionChange = (selectionType, isSelecting, selection) => {
    switch (selectionType) {
      case SelectionType.Single: {
        setSelectedResources((current) =>
          isSelecting
            ? [...current, selection]
            : current.filter((id) => id !== selection),
        );
        // After updating selected resources, check if all items are selected
        setAllResourcesSelected(
          selectedResources.length + (isSelecting ? 1 : -1) ===
            resources.length,
        );
        break;
      }

      case SelectionType.All: {
        setSelectedResources(isSelecting ? resources.map((r) => r.id) : []);
        setAllResourcesSelected(isSelecting);
        break;
      }

      default: {
        break;
      }
    }
  };

  const clearSelection = () => {
    setSelectedResources([]);
    setAllResourcesSelected(false);
  };

  return {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
    isAllSelected:
      resources.length > 0 && selectedResources.length === resources.length,
  };
}

function EmptyState({ resourceName }) {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="flex min-h-[400px] w-full flex-col items-center justify-center px-6 py-4">
            <div className="flex size-[46px] items-center justify-center rounded-lg bg-gray-100 dark:bg-neutral-800">
              <EmptyStateIcon />
            </div>
            <h2 className="mt-5 font-semibold text-gray-800 dark:text-white">
              No {resourceName.plural} to show
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-neutral-400">
              Looks like there are currently no {resourceName.plural} to show.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
