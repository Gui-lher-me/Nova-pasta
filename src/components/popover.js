"use client";

import { useState } from "react";
import { BasePopover } from "./base-popover";

export function Popover({ activatorInnerHTML, children }) {
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
      onClick={handleTogglePopover}
      className="inline-flex items-center gap-x-2 text-nowrap rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
    >
      {activatorInnerHTML}
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
}
