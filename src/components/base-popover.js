import { OutsideAlerter } from "./outside-alerter";

export function BasePopover({ activator, active, onClose, children }) {
  return (
    <OutsideAlerter onClickOutside={onClose}>
      <div className="relative inline-block [--placement:bottom-right]">
        {activator}
        {active && (
          <div
            className="duration absolute right-0 top-full z-20 mt-2 min-w-40 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white opacity-100 shadow-2xl transition-[opacity,margin] dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-900"
            aria-labelledby="table-dropdown-6"
          >
            {children}
          </div>
        )}
      </div>
    </OutsideAlerter>
  );
}
