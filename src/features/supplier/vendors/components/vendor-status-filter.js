import { RadioList } from "@/components/radio-list";
import { Popover } from "@/components/popover";
import { FilterIcon } from "@/icons";

export function VendorStatusFilter() {
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
          { value: "ALL", label: "All" },
          { value: "PENDING", label: "Pending" },
          { value: "APPROVED", label: "Approved" },
          { value: "DENIED", label: "Denied" },
          { value: "CANCELLED", label: "Cancelled" },
        ]}
        defaultValue="ALL"
        queryKey="status"
      />
    </Popover>
  );
}
