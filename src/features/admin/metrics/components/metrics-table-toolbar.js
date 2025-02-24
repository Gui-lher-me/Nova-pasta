import { SearchField } from "@/components/search-field";
import { TableToolbar } from "@/components/table-toolbar";
import { MetricDateFilter } from "./metric-date-filter";
import { RatingFilter } from "./rating-filter";

export function MetricsTableToolbar() {
  return (
    <TableToolbar>
      <SearchField />
      <div className="flex gap-x-2">
        <RatingFilter />
        <MetricDateFilter />
      </div>
    </TableToolbar>
  );
}
