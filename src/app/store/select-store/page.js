import { PageWrapper } from "@/components/page-wrapper";
import { StoreSelectionCard } from "@/features/store/select-store/components/store-selection-card";
import { getAccountInfo } from "@/features/store/select-store/server/db/select-store";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const data = await getAccountInfo();

  return (
    <PageWrapper className="max-w-lg">
      <StoreSelectionCard stores={data.stores} email={data.email} />
    </PageWrapper>
  );
}
