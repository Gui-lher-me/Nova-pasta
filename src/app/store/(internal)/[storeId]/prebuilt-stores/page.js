import { GridView } from "@/components/grid-view";
import { PageWrapper } from "@/components/page-wrapper";
import { PrebuiltItem } from "@/features/store/prebuilt-stores/components/prebuilt-item";
import { prebuiltStores } from "@/features/store/prebuilt-stores/data/prebuilt-stores";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

function Page({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const storeId = params.storeId;

  return (
    <PageWrapper title="Prebuilt stores">
      <GridView>
        {prebuiltStores.map((item) => (
          <PrebuiltItem key={item.id} item={item} storeId={storeId} />
        ))}
      </GridView>
    </PageWrapper>
  );
}
