import { SearchField } from "@/components/search-field";
import { TableToolbar } from "@/components/table-toolbar";
import { PlatformFilter } from "./platform-filter";

export function UsersTableToolbar() {
  return (
    <TableToolbar>
      <SearchField />
      <div className="flex gap-x-2">
        <PlatformFilter />
      </div>
    </TableToolbar>
  );
}
