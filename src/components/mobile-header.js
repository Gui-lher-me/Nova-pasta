import { SidebarToggleButton } from "./sidebar-toggle-button";

export function MobileHeader() {
  return (
    <div className="sticky inset-x-0 top-0 z-20 border-y bg-white px-4 dark:border-neutral-700 dark:bg-neutral-800 sm:px-6 lg:hidden">
      <div className="flex items-center justify-end py-2">
        <SidebarToggleButton />
      </div>
    </div>
  );
}
