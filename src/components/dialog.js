import { XIcon } from "@/icons";
import { forwardRef } from "react";

export const Dialog = forwardRef(({ children, onClose }, ref) => {
  return (
    <dialog
      ref={ref}
      className="border bg-white shadow-sm backdrop:bg-black/50 dark:border-neutral-800 dark:bg-neutral-900 md:max-w-2xl md:rounded-xl"
    >
      <div className="relative flex flex-col">
        <div className="absolute end-2 top-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
            aria-label="Close"
            data-hs-overlay="#hs-danger-alert"
          >
            <span className="sr-only">Close</span>
            <XIcon />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
});

Dialog.displayName = "Dialog";
