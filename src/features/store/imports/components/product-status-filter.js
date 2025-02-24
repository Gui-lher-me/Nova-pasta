import { Popover } from "@/components/popover";
import { RadioList } from "@/components/radio-list";
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
          { value: "imported", label: "Imported" },
          { value: "unimported", label: "Not imported" },
        ]}
        queryKey="status"
      />
    </Popover>
  );
}
