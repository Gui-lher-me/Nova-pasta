import { PageWrapper } from "@/components/page-wrapper";
import { Pagination } from "@/components/pagination";
import { Paper } from "@/components/paper";
import { SimpleFilters } from "@/components/simple-filters";
import { OrderStatusFilter } from "@/features/store/orders/components/order-status-filter";
import { OrdersTable } from "@/features/store/orders/components/orders-table";
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
  const tab = searchParams.tab;

  const data = await getOrders(search, page, tab);

  return (
    <PageWrapper title="Orders">
      <Paper>
        <SimpleFilters queryPlaceholder="Search orders">
          <OrderStatusFilter />
        </SimpleFilters>
        <OrdersTable orders={data?.results} storeId={storeId} />
        <Pagination
          pages={Math.ceil(data?.count / data?.per_page)}
          page={data?.page}
        />
      </Paper>
    </PageWrapper>
  );
}

async function getOrders(search, page, tab) {
  const filePath = path.join(process.cwd(), "ORDERS_MOCK_DATA.json"); // Path to ORDERS_MOCK_DATA.json file
  const ORDERS_MOCK_DATA = JSON.parse(fs.readFileSync(filePath, "utf-8")); // Read and parse JSON data
  return ORDERS_MOCK_DATA;

  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  const url = new URL("/embedded/orders/", process.env.CORE_API_URL);
  if (search) url.searchParams.set("search", search);
  url.searchParams.set("page", page);
  if (tab) url.searchParams.set("tab", tab);

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("HTTP_platform", "final-test-storehisekjgvrsk.myshopify.com");

  const rawResponse = await fetch(url, {
    headers,
    next: { tags: ["store-orders"] },
  });

  if (!rawResponse.ok) {
    throw new Error(`Failed to fetch orders. Status: ${rawResponse.status}`);
  }

  const data = await rawResponse.json();

  return data;
}
