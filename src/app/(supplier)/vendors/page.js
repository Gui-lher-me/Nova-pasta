import { PageWrapper } from "@/components/page-wrapper";
import { VendorsTable } from "@/features/supplier/vendors/components/vendors-table";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page({ searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const status = searchParams.status ?? "ALL";

  const data = await getSupplierVendors(page, status);

  return (
    <PageWrapper title="Vendors">
      <VendorsTable data={data} />
    </PageWrapper>
  );
}

async function getSupplierVendors(page, status) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/api/vendors/", process.env.CORE_API_URL);
    url.searchParams.set("page", page);
    url.searchParams.set("status", status);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-vendors"] },
    });

    if (!rawResponse.ok) {
      throw new Error(`Failed to fetch vendors. Status: ${rawResponse.status}`);
    }

    const data = await rawResponse.json();

    return data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
}
