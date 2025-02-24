"use client";

import { Filters } from "@/components/filters";
import { GridView } from "@/components/grid-view";
import { PageWrapper } from "@/components/page-wrapper";
import { Pagination } from "@/components/pagination";
import { useSupplierListState } from "../hooks/use-supplier-list-state";
import { SupplierItem } from "./supplier-item";

export function PageContent({ suppliers, storeId, pagination }) {
  const {
    filters,
    appliedFilters,
    search,
    handleFiltersQueryChange,
    handleQueryValueRemove,
    handleFiltersClearAll,
  } = useSupplierListState();

  return (
    <PageWrapper title="Suppliers">
      <Filters
        filters={filters}
        appliedFilters={appliedFilters}
        queryPlaceholder="Search suppliers"
        queryValue={search ?? ""}
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={handleQueryValueRemove}
        onClearAll={handleFiltersClearAll}
      />
      <GridView>
        {suppliers.map((supplier) => (
          <SupplierItem
            key={supplier.id}
            supplier={supplier}
            storeId={storeId}
          />
        ))}
      </GridView>
      <Pagination {...pagination} />
    </PageWrapper>
  );
}
