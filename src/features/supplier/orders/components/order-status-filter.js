import { Popover } from "@/components/popover";
import { RadioList } from "@/components/radio-list";
import { FilterIcon } from "@/icons";

export function OrderStatusFilter() {
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
          { value: "paid", label: "Paid" },
          { value: "shipped", label: "Shipped" },
          { value: "cancelled", label: "Cancelled" },
        ]}
        defaultValue="paid"
        queryKey="status"
      />
    </Popover>
  );
}
