"use client";

import { BasePopover } from "@/components/base-popover";
import { DatePicker } from "@/components/date-picker";
import { FilterIcon } from "@/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function MetricDateFilter() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [popoverActive, setPopoverActive] = useState(false);

  const handleTogglePopover = () => {
    setPopoverActive((p) => !p);
  };

  const handleClosePopover = () => {
    setPopoverActive(false);
  };

  const handleDateRangeApply = (from, to) => {
    const params = new URLSearchParams(searchParams);

    params.set("from", from);
    params.set("to", to);

    handleClosePopover();

    // Update URL with new params
    replace(`${pathname}?${params.toString()}`);
  };

  const activator = (
    <button
      id="hs-as-table-table-filter-dropdown"
      type="button"
      onClick={handleTogglePopover}
      className="inline-flex items-center gap-x-2 text-nowrap rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
    >
      <FilterIcon />
      Status
    </button>
  );

  return (
    <BasePopover
      activator={activator}
      active={popoverActive}
      onClose={handleClosePopover}
    >
      <DatePicker
        onApply={handleDateRangeApply}
        onCancel={handleClosePopover}
      />
    </BasePopover>
  );
}
