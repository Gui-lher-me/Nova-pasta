import { EyeIcon, EyeOffIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { ErrorMessage } from "./error-message";
import { Tooltip } from "./tooltip";

function Input(
  {
    type,
    id,
    label,
    labelHidden,
    placeholder,
    error,
    style,
    optional,
    tooltip,
    helperText,
    step = "1",
    stacked,
    className,
    ...rest
  },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {stacked && !labelHidden && (
        <div className={cn("sm:col-span-3", stacked ? "sm:col-span-12" : "")}>
          <div className="inline-block">
            <label
              htmlFor={id}
              className="mt-2.5 inline-block text-sm font-medium text-gray-500 dark:text-neutral-500"
            >
              {label}
            </label>{" "}
            {tooltip && <Tooltip>{tooltip}</Tooltip>}
            {optional && (
              <span className="text-sm text-gray-400 dark:text-neutral-600">
                (Optional)
              </span>
            )}
          </div>
        </div>
      )}
      <div className={cn("sm:col-span-9", stacked ? "sm:col-span-12" : "")}>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            name={id}
            type={showPassword && type === "password" ? "text" : type}
            className={cn(
              "block w-full rounded-lg border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
              style !== undefined ? "pe-14" : "",
              className,
            )}
            placeholder={placeholder}
            aria-describedby={`${id}-error`}
            step={type === "number" ? step : undefined}
            {...rest}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 end-3 flex items-center ps-4"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4 flex-shrink-0 text-gray-400 dark:text-neutral-500" />
              ) : (
                <EyeIcon className="size-4 flex-shrink-0 text-gray-400 dark:text-neutral-500" />
              )}
            </button>
          )}
          {type === "number" && style !== undefined && (
            <div className="pointer-events-none absolute inset-y-0 end-3 z-20 flex items-center">
              <span className="text-gray-500 dark:text-neutral-500">
                {style === "currency" ? "USD" : ""}
                {style === "percentage" ? "%" : ""}
              </span>
            </div>
          )}
        </div>
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
    </>
  );
}

export const InputField = forwardRef(Input);
