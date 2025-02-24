import { RadioList } from "@/components/radio-list";
import { Popover } from "@/components/popover";
import { FilterIcon } from "@/icons";

export function RatingFilter() {
  return (
    <Popover
      activatorInnerHTML={
        <>
          <FilterIcon />
          <span>Filter by rating</span>
        </>
      }
    >
      <div className="min-w-60">
        <RadioList
          options={[
            { value: "", label: "All" },
            { value: "poor", label: "Poor" },
            { value: "needs-improvement", label: "Needs improvement" },
            { value: "good", label: "Good" },
          ]}
          defaultValue=""
          queryKey="rating"
        />
      </div>
    </Popover>
  );
}
