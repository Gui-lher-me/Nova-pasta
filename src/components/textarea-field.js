import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ErrorMessage } from "./error-message";

function Textarea(
  { id, label, placeholder, error, optional, stacked, ...rest },
  ref,
) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      e.currentTarget.form?.requestSubmit(); // Trigger form submission
    }
  };

  return (
    <>
      <div className={cn("sm:col-span-3", stacked ? "sm:col-span-12" : "")}>
        <div className="inline-block">
          <label
            htmlFor={id}
            className="mt-2.5 inline-block text-sm font-medium text-gray-500 dark:text-neutral-500"
          >
            {label}
          </label>{" "}
          {optional && (
            <span className="text-sm text-gray-400 dark:text-neutral-600">
              (Optional)
            </span>
          )}
        </div>
      </div>
      <div className={cn("sm:col-span-9", stacked ? "sm:col-span-12" : "")}>
        <textarea
          ref={ref}
          id={id}
          name={id}
          className="block w-full resize-none rounded-lg border-gray-200 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          rows={6}
          placeholder={placeholder}
          aria-describedby={`${id}-error`}
          onKeyDown={handleKeyDown} // Attach keydown handler
          {...rest}
        />
        <ErrorMessage error={error} id={id} />
      </div>
    </>
  );
}

export const TextareaField = forwardRef(Textarea);
