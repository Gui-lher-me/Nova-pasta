import { TableToolbar } from "@/components/table-toolbar";
import { VendorStatusFilter } from "./vendor-status-filter";

export function VendorsTableToolbar() {
  return (
    <TableToolbar>
      <div className="grow sm:col-span-2">
        <div className="flex justify-end gap-x-2">
          <VendorStatusFilter />
        </div>
      </div>
    </TableToolbar>
  );
}
