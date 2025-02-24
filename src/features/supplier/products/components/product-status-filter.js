import { RadioList } from "@/components/radio-list";
import { Popover } from "@/components/popover";
import { FilterIcon } from "@/icons";

export function ProductStatusFilter() {
  return (
    <Popover
      activatorInnerHTML={
        <>
          <FilterIcon />
          <span>Status</span>
        </>
      }
    >
      <RadioList
        options={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "low_stock", label: "Low stock" },
        ]}
        defaultValue="all"
        queryKey="type"
      />
    </Popover>
  );
}
