"use client";

import { MenuUnfoldIcon } from "@/icons";
import { useToggle } from "@/providers/sidebar-toggle-provider";

export function SidebarToggleButton() {
  const { toggle } = useToggle();

  return (
    <button
      onClick={toggle}
      type="button"
      className="flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-gray-500 hover:text-gray-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
      aria-controls="application-sidebar"
      aria-label="Sidebar"
    >
      <MenuUnfoldIcon />
      <span className="sr-only">Sidebar</span>
    </button>
  );
}
