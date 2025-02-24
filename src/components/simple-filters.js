import { SearchBar } from "./search-bar";

export function SimpleFilters({ children, queryPlaceholder = "Search" }) {
  return (
    <div className="flex justify-between gap-x-2 px-4 py-3">
      <SearchBar placeholder={queryPlaceholder} />
      <div>
        <div className="inline-flex gap-x-2">{children}</div>
      </div>
    </div>
  );
}
