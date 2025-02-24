import { PageContent } from "@/features/store/suppliers/components/page-content";
import { getStoreSuppliers } from "@/features/store/suppliers/server/db/suppliers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page({ params, searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  // Extract storeId from params
  const { storeId } = params;

  // Fetch suppliers with searchParams and storeId
  const data = await getStoreSuppliers(storeId, searchParams);

  const transformedSuppliers = data.suppliers.map(
    ({ header_image, favourite, ...supplier }) => ({
      image: header_image,
      favorite: favourite,
      ...supplier,
    }),
  );

  return (
    <PageContent
      suppliers={transformedSuppliers}
      storeId={storeId}
      pagination={data.pagination}
    />
  );
}
