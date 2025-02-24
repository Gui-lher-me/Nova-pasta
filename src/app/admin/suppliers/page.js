import { PageWrapper } from "@/components/page-wrapper";
import { SuppliersTable } from "@/features/admin/suppliers/components/suppliers-table";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default Page;

function Page({ searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const query = searchParams.query ?? "";
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const status = searchParams.status ?? "PENDING";

  const promise = getSuppliers(query, page, status);

  return (
    <PageWrapper title="Suppliers">
      <Suspense
        fallback={<p>Loading... grab a snack, this might take a moment!</p>}
      >
        <SuppliersDataFetcher promise={promise} />
      </Suspense>
    </PageWrapper>
  );
}

async function SuppliersDataFetcher({ promise }) {
  const data = await promise;

  return <SuppliersTable data={data} />;
}

async function getSuppliers(query, page, status) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin_access_token")?.value;

    const url = new URL(
      "/api/admin/suppliers/", // needs a trailing slash
      process.env.CORE_API_URL,
    );
    if (query !== "") url.searchParams.set("search", query);
    url.searchParams.set("page", page);
    url.searchParams.set("status", status);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["admin-suppliers"] },
    });

    if (!rawResponse.ok) {
      throw new Error(
        `Failed to fetch suppliers. Status: ${rawResponse.status}`,
      );
    }

    const data = await rawResponse.json();

    return data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  }
}
