"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function RadioList({ options, defaultValue, queryKey }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleRadioChange = (newValue) => {
    const params = new URLSearchParams(searchParams);
    if (newValue === "") {
      params.delete(queryKey);
    } else {
      params.set(queryKey, newValue);
    }

    // Reset pagination to the first page
    if (parseInt(searchParams.get("page")) > 1) {
      params.set("page", 1);
    }

    // Update URL with new params
    replace(`${pathname}?${params.toString()}`);
  };

  const currentValue = searchParams.get(queryKey) ?? defaultValue;

  return (
    <div className="min-w-48 divide-y divide-gray-200 dark:divide-neutral-700">
      {options.map((option) => (
        <label key={option.value} className="flex px-3 py-2.5">
          <input
            type="radio"
            className="mt-0.5 shrink-0 rounded-full border-gray-200 text-primary-600 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-primary-500 dark:checked:bg-primary-500 dark:focus:ring-offset-gray-800"
            checked={option.value === currentValue}
            onChange={() => handleRadioChange(option.value)}
          />
          <span className="ms-3 flex-nowrap text-sm text-gray-800 dark:text-neutral-200">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
