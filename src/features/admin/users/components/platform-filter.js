import { Popover } from "@/components/popover";
import { RadioList } from "@/components/radio-list";
import { FilterIcon } from "@/icons";

export function PlatformFilter() {
  return (
    <Popover
      activatorInnerHTML={
        <>
          <FilterIcon />
          <span>Filter by platform</span>
        </>
      }
    >
      <div className="min-w-60">
        <RadioList
          options={[
            { value: "", label: "All" },
            { value: "shopify", label: "Shopify" },
            { value: "wix", label: "Wix" },
            { value: "bigcommerce", label: "BigCommerce" },
            { value: "shopplaza", label: "Shoplaza" },
          ]}
          defaultValue=""
          queryKey="platform"
        />
      </div>
    </Popover>
  );
}
