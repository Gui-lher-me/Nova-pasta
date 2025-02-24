import { PageWrapper } from "@/components/page-wrapper";
import { PrebuiltsTable } from "@/features/admin/prebuilts/components/prebuilts-table";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page({ searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_access_token")?.value;
  if (!token) {
    return redirect("/auth/?mode=login");
  }
  const query = searchParams.query ?? "";
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const status = searchParams.status ?? "pending";
  const data = await getPrebuilts(query, page, status);
  return (
    <PageWrapper title="Prebuilt Stores">
      <PrebuiltsTable data={data} />
    </PageWrapper>
  );
}

async function getPrebuilts(query, page, status) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin_access_token")?.value;

    const url = new URL("/api/admin/prebuilts/", process.env.CORE_API_URL);
    if (query !== "") url.searchParams.set("search", query);
    url.searchParams.set("page", page);
    url.searchParams.set("status", status);
    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["admin-prebuilts"] },
    });

    if (!rawResponse.ok) {
      throw new Error(
        `Failed to fetch prebuilts. Status: ${rawResponse.status}`,
      );
    }

    const data = await rawResponse.json();

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
