import { PageWrapper } from "@/components/page-wrapper";
import { OrdersTable } from "@/features/supplier/orders/components/orders-table";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page({ searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const query = searchParams.query;
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const status = searchParams.status ?? "paid";
  const vendorId = searchParams.vendor_id;

  const data = await getSupplierOrders(query, page, status, vendorId);

  return (
    <PageWrapper title="Orders">
      <OrdersTable data={data} />
    </PageWrapper>
  );
}

async function getSupplierOrders(query, page, status, vendorId) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/supplier_orders/", process.env.CORE_API_URL);
    if (query) url.searchParams.set("search", query);
    url.searchParams.set("page", page);
    url.searchParams.set("status", status);
    if (vendorId) url.searchParams.set("vendor_id", vendorId);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-orders"] },
    });

    if (!rawResponse.ok) {
      throw new Error(`Failed to fetch orders. Status: ${rawResponse.status}`);
    }

    const data = await rawResponse.json();

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
