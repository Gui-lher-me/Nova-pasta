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
          { label: "Unpaid", value: "unpaid" },
          { label: "Paid", value: "paid" },
          { label: "Shipped", value: "shipped" },
          { label: "Canceled", value: "canceled" },
        ]}
        queryKey="tab"
      />
    </Popover>
  );
}
