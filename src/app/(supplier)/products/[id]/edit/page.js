import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { DangerAlert } from "@/components/danger-alert";
import { EditVariantsForm } from "@/features/supplier/products/components/forms/edit-variants-form";
import { ProductForm } from "@/features/supplier/products/components/forms/product-form";
import { ImagesCard } from "@/features/supplier/products/components/images-card";
import { ProductPageWrapper } from "@/features/supplier/products/components/product-page-wrapper";
import { PlusIcon } from "@/icons";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default Page;

async function Page({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const id = params.id;

  const product = await getSupplierProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <ProductPageWrapper id={product.id} isActive={product.active}>
      {product.images.length === 0 && (
        <DangerAlert>
          <span id="hs-soft-color-danger-label" className="font-bold">
            Visibility alert:
          </span>{" "}
          Products without images will not appear in the marketplace.
        </DangerAlert>
      )}
      <Card>
        <CardContent>
          <ProductForm product={product} />
        </CardContent>
      </Card>
      <ImagesCard id={product.id} images={product.images} />
      <Card>
        <CardContent>
          <div className="space-y-2 sm:space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                Product variants
              </h2>
              <Link
                className="inline-flex items-center gap-x-1 text-sm font-medium text-primary-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-primary-500"
                href={`/products/${product.id}/edit/new-variant`}
              >
                <PlusIcon />
                New variant
              </Link>
            </div>
            {product.variants.length === 0 ? (
              <p className="flex max-h-[250px] min-h-[150px] items-center justify-center text-muted-foreground">
                No variants available
              </p>
            ) : (
              <EditVariantsForm product={product} />
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Product-level shipping rates</CardTitle>
          <CardDescription>
            Set custom shipping rates for this specific product to override your
            account-level shipping rates.
          </CardDescription>
        </CardHeader>
        <CardFooter justifyEnd>
          <Button asChild variant="outline">
            <Link href={`/settings/shippings/?product_id=${product.id}`}>
              View & set shipping rates
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </ProductPageWrapper>
  );
}

async function getSupplierProduct(id) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/supplier_product/", process.env.CORE_API_URL);
    url.searchParams.set("id", id);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-product"] },
    });

    if (!rawResponse.ok) {
      throw new Error(`Failed to fetch product. Status: ${rawResponse.status}`);
    }

    const product = await rawResponse.json();

    // Check if product content exists
    if (!product) {
      console.warn("Product content not found");
      return undefined;
    }

    const transformedProduct = {
      ...product.product,
      variants: product.product.variants.map(
        ({ retail_price, ...variant }) => ({
          ...variant,
          retailPrice: retail_price,
        }),
      ),
    };

    return transformedProduct;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}
