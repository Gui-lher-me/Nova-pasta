"use client";

import { Filters } from "@/components/filters";
import { GridView } from "@/components/grid-view";
import { PageWrapper } from "@/components/page-wrapper";
import { Pagination } from "@/components/pagination";
import { useProductListState } from "../hooks/use-product-list-state";
import { ProductItem } from "./product-item";

export function PageContent({ products, storeId, pagination }) {
  const {
    filters,
    appliedFilters,
    search,
    handleFiltersQueryChange,
    handleQueryValueRemove,
    handleFiltersClearAll,
  } = useProductListState();

  return (
    <PageWrapper title="Products">
      <Filters
        filters={filters}
        appliedFilters={appliedFilters}
        queryPlaceholder="Search products"
        queryValue={search ?? ""}
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={handleQueryValueRemove}
        onClearAll={handleFiltersClearAll}
      />
      <GridView>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} storeId={storeId} />
        ))}
      </GridView>
      <Pagination {...pagination} />
    </PageWrapper>
  );
}
