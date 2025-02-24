import { SearchField } from "@/components/search-field";
import { TableToolbar } from "@/components/table-toolbar";
import { ProductStatusFilter } from "./product-status-filter";

export function ProductsTableToolbar() {
  return (
    <TableToolbar>
      <SearchField />
      <div className="flex gap-x-2">
        <ProductStatusFilter />
      </div>
    </TableToolbar>
  );
}
