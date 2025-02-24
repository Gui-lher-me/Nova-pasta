"use client";

import { MagnifyingGlassIcon } from "@/icons";
import { useState } from "react";
import { BasePopover } from "./base-popover";

export function Filters({
  filters,
  appliedFilters,
  queryPlaceholder,
  queryValue,
  onQueryChange,
  onQueryClear,
  onClearAll,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="">
      {/* Search and Filters Container */}
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        {/* Search */}
        <div className="w-full sm:w-72">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              name="search"
              className="block w-full rounded-lg border-gray-200 px-2 py-1.5 ps-11 text-sm focus:border-primary-500 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              value={queryValue}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={queryPlaceholder}
              onFocus={handleFocus}
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
              <MagnifyingGlassIcon />
            </div>
            {isFocused && queryValue.length > 0 && (
              <div className="absolute inset-y-0 end-0 flex items-center pe-4">
                <button
                  type="button"
                  onClick={onQueryClear}
                  className="text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                >
                  <XIcon />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <Filter
              key={filter.key}
              label={filter.label}
              disabled={filter.disabled}
            >
              {filter.filter}
            </Filter>
          ))}
        </div>
      </div>
      {/* Active Filters (Optional) */}
      <div className="mt-2 flex flex-wrap gap-2">
        {appliedFilters.map((appliedFilter) => (
          <span
            key={appliedFilter.key}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800"
          >
            {appliedFilter.label}
            <button
              type="button"
              onClick={appliedFilter.onRemove}
              className="inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus:bg-gray-200 focus:text-gray-800 focus:outline-none"
            >
              <span className="sr-only">Remove</span>
              <XIcon />
            </button>
          </span>
        ))}
        {(queryValue.length > 0 || appliedFilters.length > 0) && (
          <button type="button" onClick={onClearAll} className="text-xs">
            <span className="sr-only">Remove</span>
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

const Filter = ({ label, disabled, children }) => {
  const [popoverActive, setPopoverActive] = useState(false);

  const handleTogglePopover = () => {
    setPopoverActive((p) => !p);
  };

  const handleClosePopover = () => {
    setPopoverActive(false);
  };

  const activator = (
    <button
      id="hs-as-table-table-filter-dropdown"
      type="button"
      disabled={disabled}
      onClick={handleTogglePopover}
      className="inline-flex items-center gap-x-2 text-nowrap rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
    >
      {label}
      <ChevronDownIcon />
    </button>
  );

  return (
    <BasePopover
      activator={activator}
      active={popoverActive}
      onClose={handleClosePopover}
    >
      {children}
    </BasePopover>
  );
};

function XIcon() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="hs-dropdown-open:rotate-180 h-3.5 w-3.5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
