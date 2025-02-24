import { ChoiceList } from "@/components/choice-list";
import { categoryMap, INITIAL_FILTERS } from "@/constants";
import { capitalized, humanize } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useSupplierListState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const values = searchParams.getAll("values");
  const manufacturingCountry = searchParams.get("manufacturingCountry");
  const supplierCountry = searchParams.get("supplierCountry");
  const shipsTo = searchParams.get("shipsTo");

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value); // Set the value for the given key
    } else {
      if (key === "category") {
        params.delete("subcategory");
      }
      params.delete(key); // Remove key if no value is selected
    }

    params.set("page", "1"); // Reset page to 1

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Debounce callback
  const debounced = useDebouncedCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value); // Set the search query
      } else {
        params.delete("search"); // Remove search query if empty
      }
      params.set("page", "1"); // Reset page to 1
      router.replace(`${pathname}?${params.toString()}`);
    },
    300, // Delay in ms
  );

  // Handler for search query change
  const handleFiltersQueryChange = (value) => {
    setSearch(value);
    debounced(value);
  };

  const handleQueryValueRemove = () => {
    setSearch("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search"); // Remove search query
    params.set("page", "1"); // Reset page to 1
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleFiltersClearAll = () => {
    setSearch("");
    const params = new URLSearchParams();
    params.set("page", "1"); // Reset page to 1
    router.replace(`${pathname}?${params.toString()}`);
  };

  const categoryChoices = Object.keys(categoryMap).map((key) => ({
    value: key,
    label: categoryMap[key].label,
  }));

  const filters = [
    {
      key: "category",
      label: "Category",
      filter: (
        <ChoiceList
          choices={categoryChoices}
          selected={[category]}
          onChange={([value]) => updateFilter("category", value)}
        />
      ),
    },
    {
      key: "subcategory",
      label: "Subcategory",
      filter: (
        <ChoiceList
          choices={categoryMap[category]?.subcategories || []}
          selected={[subcategory]}
          onChange={([value]) => updateFilter("subcategory", value)}
        />
      ),
      disabled: !category,
    },
    {
      key: "values",
      label: "Values",
      filter: (
        <ChoiceList
          choices={INITIAL_FILTERS.values}
          selected={values}
          onChange={(array) => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("values"); // Clear existing values
            array.forEach((value) => params.append("values", value)); // Add selected values
            params.set("page", "1"); // Reset page to 1
            router.replace(`${pathname}?${params.toString()}`);
          }}
          allowMultiple
        />
      ),
    },
    {
      key: "manufacturingCountry",
      label: "Manufacturing country",
      filter: (
        <ChoiceList
          choices={INITIAL_FILTERS.manufacturingCountry}
          selected={[manufacturingCountry]}
          onChange={([value]) => updateFilter("manufacturingCountry", value)}
        />
      ),
    },
    {
      key: "supplierCountry",
      label: "Supplier country",
      filter: (
        <ChoiceList
          choices={INITIAL_FILTERS.supplierCountry}
          selected={[supplierCountry]}
          onChange={([value]) => updateFilter("supplierCountry", value)}
        />
      ),
    },
    {
      key: "shipsTo",
      label: "Ships to",
      filter: (
        <ChoiceList
          choices={INITIAL_FILTERS.shipsTo}
          selected={[shipsTo]}
          onChange={([value]) => updateFilter("shipsTo", value)}
        />
      ),
    },
  ];

  const appliedFilters = [];
  if (category && category !== "") {
    appliedFilters.push({
      key: "category",
      label: "Category: " + humanize(category),
      onRemove: () => updateFilter("category"),
    });
  }

  if (subcategory && subcategory !== "") {
    appliedFilters.push({
      key: "subcategory",
      label: "Subcategory: " + humanize(subcategory),
      onRemove: () => updateFilter("subcategory"),
    });
  }

  if (values && 0 < values.length) {
    appliedFilters.push({
      key: "values",
      label: "Values: " + values.map((val) => humanize(val)).join(", "),
      onRemove: () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("values"); // Remove all values
        params.set("page", "1"); // Reset page to 1
        router.replace(`${pathname}?${params.toString()}`);
      },
    });
  }

  if (manufacturingCountry && manufacturingCountry !== "") {
    appliedFilters.push({
      key: "manufacturingCountry",
      label:
        "Manufacturing country: " +
        (manufacturingCountry === "usa"
          ? manufacturingCountry.toUpperCase()
          : capitalized(manufacturingCountry)),
      onRemove: () => updateFilter("manufacturingCountry"),
    });
  }

  if (supplierCountry && supplierCountry !== "") {
    appliedFilters.push({
      key: "supplierCountry",
      label:
        "Supplier country: " +
        (supplierCountry === "usa"
          ? supplierCountry.toUpperCase()
          : capitalized(supplierCountry)),
      onRemove: () => updateFilter("supplierCountry"),
    });
  }

  if (shipsTo && shipsTo !== "") {
    appliedFilters.push({
      key: "shipsTo",
      label:
        "Ships to: " +
        (["all", "usa"].includes(shipsTo)
          ? shipsTo.toUpperCase()
          : capitalized(shipsTo)),
      onRemove: () => updateFilter("shipsTo"),
    });
  }

  return {
    search,
    filters,
    appliedFilters,
    handleFiltersQueryChange,
    handleQueryValueRemove,
    handleFiltersClearAll,
  };
}
