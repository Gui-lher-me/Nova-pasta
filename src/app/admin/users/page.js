import { PageWrapper } from "@/components/page-wrapper";
import { UsersTable } from "@/features/admin/users/components/users-table";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page({ searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const query = searchParams.query;
  const platform = searchParams.platform;
  const data = await getUsers(query, platform);

  return (
    <PageWrapper title="Users">
      <UsersTable data={data} />
    </PageWrapper>
  );
}

async function getUsers(query, platform) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin_access_token")?.value;

    const url = new URL("/api/admin/users/coupon/", process.env.CORE_API_URL);
    if (query) url.searchParams.set("search", query);
    if (platform) url.searchParams.set("platform", platform);
    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["users"] },
    });

    if (!rawResponse.ok) {
      throw new Error(`Failed to fetch users. Status: ${rawResponse.status}`);
    }

    const data = await rawResponse.json();

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
