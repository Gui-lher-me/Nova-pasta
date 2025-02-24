import { MagnifyingGlassIcon } from "@/icons";

export function SearchInput(props) {
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
          placeholder="Search"
          {...props}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
          <MagnifyingGlassIcon />
        </div>
      </div>
    </div>
  );
}
