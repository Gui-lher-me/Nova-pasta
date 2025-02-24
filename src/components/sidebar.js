"use client";

import { cn } from "@/lib/utils";
import { useToggle } from "@/providers/sidebar-toggle-provider";

export function Sidebar({ children }) {
  const { isOpen } = useToggle();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 start-0 z-[60] w-[260px] flex-col border-e border-gray-200 bg-white transition-transform duration-300 ease-in-out dark:border-neutral-700 dark:bg-neutral-800 lg:flex lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="px-8 pt-4">
        <div className="inline-block flex-none rounded-xl text-xl font-semibold focus:opacity-80 focus:outline-none">
          <h1 className="font-bold text-primary-500">DropCommerce</h1>
        </div>
      </div>
      <nav className="flex flex-col p-6">
        <ul className="space-y-1.5">{children}</ul>
      </nav>
    </aside>
  );
}
