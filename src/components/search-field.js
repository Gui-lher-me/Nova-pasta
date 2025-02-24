"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchInput } from "./search-input";

export function SearchField() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((search) => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("query", search);
    } else {
      params.delete("query");
    }

    // Reset the pagination to the first page
    if (parseInt(searchParams.get("page")) > 1) {
      params.set("page", 1);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <SearchInput
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
}
