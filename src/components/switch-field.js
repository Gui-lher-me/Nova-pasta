import { ErrorMessage } from "./error-message";
import { Tooltip } from "./tooltip";

export function SwitchField({ helperText, tooltip, ...field }) {
  return (
    <div className="relative flex items-start sm:col-span-12">
      <div className="mt-1 flex h-5 items-center">
        <input
          type="checkbox"
          className="relative h-[21px] w-[35px] cursor-pointer rounded-full border-transparent bg-gray-100 text-transparent transition-colors duration-200 ease-in-out before:inline-block before:size-4 before:translate-x-0 before:transform before:rounded-full before:bg-white before:shadow before:ring-0 before:transition before:duration-200 before:ease-in-out checked:border-primary-600 checked:bg-none checked:text-primary-600 checked:before:translate-x-full checked:before:bg-primary-200 focus:ring-primary-600 focus:checked:border-primary-600 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:before:bg-neutral-400 dark:checked:border-primary-500 dark:checked:bg-primary-500 dark:checked:before:bg-primary-200 dark:focus:ring-offset-gray-600"
          name={field.id}
          {...field}
        />
      </div>
      <label htmlFor={field.id} className="ms-3">
        <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-300">
          {field.label}
          {tooltip && <Tooltip>{tooltip}</Tooltip>}
        </span>
        {helperText && (
          <span
            // id="hs-checkbox-delete-description"
            className="block text-sm text-gray-600 dark:text-neutral-500"
          >
            {helperText}
          </span>
        )}
        <div>
          <ErrorMessage error={field.error} id={field.id} />
        </div>
      </label>
    </div>
  );
}
