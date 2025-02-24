import { PageWrapper } from "@/components/page-wrapper";
import { Pagination } from "@/components/pagination";
import { Paper } from "@/components/paper";
import { SimpleFilters } from "@/components/simple-filters";
import { ProductStatusFilter } from "@/features/store/imports/components/product-status-filter";
import { ProductsTable } from "@/features/store/imports/components/products-table";
import fs from "fs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import path from "path";

export default Page;

async function Page({ params, searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const storeId = params.storeId;

  const search = searchParams.search;
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const status = searchParams.status;

  const data = await getStoreImportList(search, page, status);

  return (
    <PageWrapper title="Import list">
      <Paper>
        <SimpleFilters queryPlaceholder="Search products">
          <ProductStatusFilter />
        </SimpleFilters>
        <ProductsTable products={data?.results} storeId={storeId} />
        <Pagination
          pages={Math.ceil(data?.count / data?.per_page)}
          page={data?.page}
        />
      </Paper>
    </PageWrapper>
  );
}

async function getStoreImportList(search, page, status) {
  const filePath = path.join(process.cwd(), "IMPORT_LIST_MOCK_DATA.json"); // Path to IMPORT_LIST_MOCK_DATA.json file
  const IMPORT_LIST_MOCK_DATA = JSON.parse(fs.readFileSync(filePath, "utf-8")); // Read and parse JSON data
  return IMPORT_LIST_MOCK_DATA;

  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  const url = new URL("/embedded/imports/", process.env.CORE_API_URL);
  if (search) url.searchParams.set("search", search);
  url.searchParams.set("page", page);
  if (status) url.searchParams.set("status", status);

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("HTTP_platform", "final-test-storehisekjgvrsk.myshopify.com");

  const rawResponse = await fetch(url, {
    headers,
    next: { tags: ["store-imports"] },
  });

  if (!rawResponse.ok) {
    throw new Error(`Failed to fetch products. Status: ${rawResponse.status}`);
  }

  const data = await rawResponse.json();

  return data;
}
