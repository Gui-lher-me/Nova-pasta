import { PageContent } from "@/features/store/products/components/page-content";
import { getStoreProducts } from "@/features/store/products/server/db/products";
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

  // Fetch products with searchParams and storeId
  const data = await getStoreProducts(storeId, searchParams);

  const transformedProducts = data.products.map(
    ({ thumbnail_image_url, price, ...product }) => ({
      ...product,
      image: thumbnail_image_url,
      lowestPrice: price,
      highestPrice: price,
    }),
  );

  return (
    <PageContent
      products={transformedProducts}
      storeId={storeId}
      pagination={data.pagination}
    />
  );
}
