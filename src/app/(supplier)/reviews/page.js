import { PageWrapper } from "@/components/page-wrapper";
import { ReviewsTable } from "@/features/supplier/reviews/components/reviews-table";
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

  const data = await getSupplierReviews(page);

  return (
    <PageWrapper title="Reviews">
      <ReviewsTable data={data} />
    </PageWrapper>
  );
}

async function getSupplierReviews(page) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/api/supplier-reviews/", process.env.CORE_API_URL);
    url.searchParams.set("page", page);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-reviews"] },
    });

    if (!rawResponse.ok) {
      throw new Error(`Failed to fetch reviews. Status: ${rawResponse.status}`);
    }

    const data = await rawResponse.json();

    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}
