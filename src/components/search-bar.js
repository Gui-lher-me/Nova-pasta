"use client";

import { MagnifyingGlassIcon } from "@/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchBar({ placeholder }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((search) => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    // Reset the pagination to the first page
    if (parseInt(searchParams.get("page")) > 1) {
      params.set("page", 1);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          id="search"
          name="search"
          className="block w-full rounded-lg border-gray-200 px-3 py-2 ps-11 text-sm focus:border-primary-500 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("search")?.toString()}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
          <MagnifyingGlassIcon />
        </div>
      </div>
    </div>
  );
}
