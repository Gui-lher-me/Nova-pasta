import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ErrorMessage } from "./error-message";
import { Tooltip } from "./tooltip";

function SelectFieldComponent(
  {
    id,
    label,
    options,
    error,
    optional,
    tooltip,
    stacked,
    helperText,
    ...rest
  },
  ref,
) {
  return (
    <>
      <div className={cn("sm:col-span-3", stacked ? "sm:col-span-12" : "")}>
        <div className="inline-block">
          <label
            htmlFor={id}
            className="mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500"
          >
            {label}
          </label>
          {tooltip && <Tooltip>{tooltip}</Tooltip>}
          {optional && (
            <span className="text-sm text-gray-400 dark:text-neutral-600">
              (Optional)
            </span>
          )}
        </div>
      </div>
      <div className={cn("sm:col-span-9", stacked ? "sm:col-span-12" : "")}>
        <div>
          <select
            ref={ref}
            id={id}
            name={id}
            className="relative -ms-px -mt-px block h-9 w-full rounded-lg border-gray-200 bg-transparent px-3 py-2 pe-9 text-sm shadow-sm focus:z-10 focus:border-primary-500 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 sm:mt-0 sm:first:ms-0"
            {...rest}
          >
            <option className="dark:bg-neutral-800" value="">
              Please select
            </option>
            {options.map((option) => (
              <option
                className="dark:bg-neutral-800"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ErrorMessage error={error} id={id} />
          {helperText && (
            <p
              className="mt-2 text-sm text-gray-500 dark:text-neutral-500"
              id={`${id}-helper-text`}
            >
              {helperText}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export const SelectField = forwardRef(SelectFieldComponent);
