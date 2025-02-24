import { PageWrapper } from "@/components/page-wrapper";
import { MetricsTable } from "@/features/admin/metrics/components/metrics-table";
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
  const rating = searchParams.rating;
  const from = searchParams.from;
  const to = searchParams.to;

  const data = await getMetrics(query, rating, from, to);

  return (
    <PageWrapper title="Metrics">
      <MetricsTable data={data} />
    </PageWrapper>
  );
}

async function getMetrics(query, rating, from, to) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin_access_token")?.value;

    const url = new URL(
      "/api/admin/vitals/lcp/", // needs a trailing slash
      process.env.CORE_API_URL,
    );
    if (query) url.searchParams.set("search", query);
    if (rating) url.searchParams.set("rating", rating);
    if (from && to) {
      url.searchParams.set("from", from);
      url.searchParams.set("to", to);
    }

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["metrics"] },
    });

    if (!rawResponse.ok) {
      throw new Error(`Failed to fetch metrics. Status: ${rawResponse.status}`);
    }

    const data = await rawResponse.json();

    return data;
  } catch (error) {
    console.error("Error fetching metrics:", error);
    throw error;
  }
}
