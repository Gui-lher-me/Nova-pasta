import { PageWrapper } from "@/components/page-wrapper";
import { ProductEditorForm } from "@/features/store/imports/components/product-editor-form";
import fs from "fs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import path from "path";

export default Page;

async function Page({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const id = params.id;

  const product = await getProduct(id);

  return (
    <PageWrapper narrowWidth title="Product editor">
      <ProductEditorForm product={product} />
    </PageWrapper>
  );
}

async function getProduct(id) {
  const filePath = path.join(process.cwd(), "PRODUCT_EDITOR_MOCK_DATA.json"); // Path to PRODUCT_EDITOR_MOCK_DATA.json file
  const PRODUCT_EDITOR_MOCK_DATA = JSON.parse(
    fs.readFileSync(filePath, "utf-8"),
  ); // Read and parse JSON data
  return PRODUCT_EDITOR_MOCK_DATA;

  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  const url = new URL("/embedded/imports/", process.env.CORE_API_URL);
  url.pathname += `${id}/`;

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("HTTP_platform", "final-test-storehisekjgvrsk.myshopify.com");

  const rawResponse = await fetch(url, {
    headers,
    next: { tags: ["store-product-editor", id] },
  });

  if (rawResponse.status === 404) {
    notFound();
  }

  if (!rawResponse.ok) {
    throw new Error(`Failed to fetch product. Status: ${rawResponse.status}`);
  }

  const product = await rawResponse.json();
  if (!product) notFound();
  return product;
}
