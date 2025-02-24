import { PageWrapper } from "@/components/page-wrapper";
import { ProductsTable } from "@/features/supplier/products/components/products-table";
import { ShopifyProductsImportCard } from "@/features/supplier/products/components/shopify-products-import-card";
import { PlusIcon } from "@/icons";
import { getSupplierSettings } from "@/lib/api/get-supplier-settings";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page({ searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const settings = await getSupplierSettings();
  const shopifyUrl = settings.shopify_url;
  const shopifyTokenSaved = settings.shopify_token_saved;
  const isShopifyConnected = shopifyUrl && shopifyTokenSaved;

  const query = searchParams.query;
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const type = searchParams.type ?? "all";

  const data = await getSupplierProducts(query, page, type);

  return (
    <PageWrapper
      title="Products"
      primaryAction={{
        content: "New product",
        icon: PlusIcon,
        url: "/products/new",
      }}
    >
      {isShopifyConnected && data.products.length === 0 && (
        <ShopifyProductsImportCard />
      )}
      <ProductsTable data={data} />
    </PageWrapper>
  );
}

async function getSupplierProducts(query, page, type) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/supplier_products/", process.env.CORE_API_URL);
    if (query) url.searchParams.set("search", query);
    url.searchParams.set("page", page);
    url.searchParams.set("type", type);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-products"] },
    });

    if (!rawResponse.ok) {
      throw new Error(
        `Failed to fetch products. Status: ${rawResponse.status}`,
      );
    }

    const data = await rawResponse.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
