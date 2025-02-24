import { PageWrapper } from "@/components/page-wrapper";
import { BarChart } from "@/features/admin/metrics/components/bar-chart";
import { transformData } from "@/features/admin/metrics/utils/metrics";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default Page;

async function Page({ params, searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const id = params.id;

  const from = searchParams.from;
  const to = searchParams.to;

  const metricDetails = await getMetricDetails(id, from, to);

  if (!metricDetails) {
    notFound();
  }

  const chartData = transformData(metricDetails);

  return (
    <PageWrapper title="Metric details">
      <BarChart chartData={chartData} />
    </PageWrapper>
  );
}

async function getMetricDetails(id, from, to) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin_access_token")?.value;

    const url = new URL(
      "/api/admin/vitals/", // needs a trailing slash
      process.env.CORE_API_URL,
    );
    url.pathname += `${id}/`;
    url.searchParams.set("name", "LCP");
    if (from && to) {
      url.searchParams.set("from", from);
      url.searchParams.set("to", to);
    }

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["metric-details"] },
    });

    if (!rawResponse.ok) {
      throw new Error(
        `Failed to fetch metric details. Status: ${rawResponse.status}`,
      );
    }

    const metricDetails = await rawResponse.json();

    // Check if metric details content exists
    if (Object.values(metricDetails).length === 0) {
      console.warn("Metric details content not found");
      return undefined;
    }

    return metricDetails;
  } catch (error) {
    console.error("Error fetching metric details:", error);
    throw error;
  }
}
