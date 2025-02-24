import { Popover } from "@/components/popover";
import { RadioList } from "@/components/radio-list";
import { FilterIcon } from "@/icons";

export function PrebuiltStatusFilter() {
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
          { value: "pending", label: "Pending" },
          { value: "completed", label: "Completed" },
        ]}
        defaultValue="pending"
        queryKey="status"
      />
    </Popover>
  );
}
