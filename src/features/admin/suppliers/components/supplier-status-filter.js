import { Popover } from "@/components/popover";
import { RadioList } from "@/components/radio-list";
import { FilterIcon } from "@/icons";

export function SupplierStatusFilter() {
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
          { value: "PENDING", label: "Pending" },
          { value: "ONBOARDING", label: "Onboarding" },
          { value: "HIDDEN", label: "Hidden" },
          { value: "NO_PLATFORM", label: "No platform" },
          { value: "NO_PAYMENT_METHOD", label: "No payment" },
          { value: "ON_HOLIDAYS", label: "On holidays" },
          { value: "LOW_SCORE", label: "Low score" },
          { value: "REJECTED", label: "Rejected" },
          { value: "REMOVED", label: "Removed" },
          { value: "PRIVATE", label: "Private" },
          { value: "ACTIVE", label: "Active" },
        ]}
        defaultValue="PENDING"
        queryKey="status"
      />
    </Popover>
  );
}
