import { PageWrapper } from "@/components/page-wrapper";
import { ReferralsTable } from "@/features/supplier/settings/referrals/components/referrals-table";
import { PlusIcon } from "@/icons";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const data = await getSupplierReferrals();

  return (
    <PageWrapper
      title="Referrals"
      primaryAction={{
        content: "New referral",
        icon: PlusIcon,
        url: "/settings/referrals/new",
      }}
    >
      <ReferralsTable data={data} />
    </PageWrapper>
  );
}

async function getSupplierReferrals() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/referrals/", process.env.CORE_API_URL);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-referrals"] },
    });

    if (!rawResponse.ok) {
      throw new Error(
        `Failed to fetch referrals. Status: ${rawResponse.status}`,
      );
    }

    const data = await rawResponse.json();

    return data;
  } catch (error) {
    console.error("Error fetching referrals:", error);
    throw error;
  }
}
