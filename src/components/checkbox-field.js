import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ErrorMessage } from "./error-message";

function CheckboxFieldComponent({ helperText, ...field }, ref) {
  return (
    <div className="relative flex items-start sm:col-span-12">
      <div className={cn("flex h-5 items-center", helperText ? "mt-1" : "")}>
        <input
          ref={ref}
          type="checkbox"
          className="rounded border-gray-200 text-primary-600 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-primary-500 dark:checked:bg-primary-500 dark:focus:ring-offset-gray-800"
          name={field.id}
          {...field}
        />
      </div>
      {!helperText && (
        <label
          htmlFor={field.id}
          className="ms-2 text-sm text-gray-500 dark:text-neutral-400"
        >
          {field.label}
        </label>
      )}
      {helperText && (
        <label htmlFor={field.id} className="ms-3">
          <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-300">
            {field.label}
          </span>
          {helperText && (
            <span
              id={`${field.id}-description`}
              className="block text-sm text-gray-600 dark:text-neutral-500"
            >
              {helperText}
            </span>
          )}
          <div>
            <ErrorMessage error={field.error} id={field.id} />
          </div>
        </label>
      )}
    </div>
  );
}

export const CheckboxField = forwardRef(CheckboxFieldComponent);
