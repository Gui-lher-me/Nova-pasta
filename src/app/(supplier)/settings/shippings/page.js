import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { DangerAlert } from "@/components/danger-alert";
import { PageWrapper } from "@/components/page-wrapper";
import { ManufacturingForm } from "@/features/supplier/settings/shippings/components/forms/manufacturing-form";
import { ShippingsTable } from "@/features/supplier/settings/shippings/components/shippings-table";
import { PlusIcon } from "@/icons";
import { getSupplierSettings } from "@/lib/api/get-supplier-settings";
import { getSupplierWarnings } from "@/lib/utils";
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

  const supplierWarnings = getSupplierWarnings(settings);

  const productId = searchParams.product_id;

  const shippingOptions = await getSupplierShippingOptions(productId);

  const flattenedOptions = shippingOptions.flatMap((country) =>
    country.options.map((option) => ({
      country_name: country.country_name,
      // country_code: country.country_code,
      ...option,
    })),
  );

  return (
    <PageWrapper
      title="Shipping rates"
      subtitle="See shipping rates, add new, and more."
      primaryAction={{
        content: "New shipping rate",
        icon: PlusIcon,
        url: `shippings/new${productId !== undefined ? `/?product_id=${productId}` : ""}`,
      }}
    >
      {supplierWarnings.active_shipping_options && (
        <DangerAlert>
          <span id="hs-soft-color-danger-label" className="font-bold">
            No active shipping rates:
          </span>{" "}
          Please activate or set shipping rates to continue.
        </DangerAlert>
      )}
      <ShippingsTable shippings={flattenedOptions} productId={productId} />
      <Card>
        <CardHeader>
          <CardTitle>Manufacturing time</CardTitle>
        </CardHeader>
        <CardContent>
          <ManufacturingForm manufacturingTime={settings.manufacturing_time} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

async function getSupplierShippingOptions(productId) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/api/shipping-options/", process.env.CORE_API_URL);
    if (productId) {
      url.searchParams.set("product-id", productId);
    } else {
      url.searchParams.set("supplier-only", 1);
    }

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-shipping-options"] },
    });

    if (!rawResponse.ok) {
      throw new Error(
        `Failed to fetch shipping options. Status: ${rawResponse.status}`,
      );
    }

    const shippingOptions = await rawResponse.json();

    return shippingOptions;
  } catch (error) {
    console.error("Error fetching shipping options:", error);
    throw error;
  }
}
