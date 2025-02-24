import { PageWrapper } from "@/components/page-wrapper";
import { getCountryFromCode } from "@/constants";
import { ShippingCard } from "@/features/supplier/settings/shippings/components/shipping-card";
import { getSupplierSettings } from "@/lib/api/get-supplier-settings";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default Page;

async function Page({ params, searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const settings = await getSupplierSettings();

  const id = params.id;
  const productId = searchParams.product_id;

  const shippingOption = await getSupplierShippingOptionById(id);

  if (!shippingOption) {
    notFound();
  }

  return (
    <PageWrapper
      narrowWidth
      title={`${getCountryFromCode(shippingOption.to_country)} shipping option`}
    >
      <ShippingCard
        shippingOption={shippingOption}
        country={settings.country}
        productId={productId}
      />
    </PageWrapper>
  );
}

async function getSupplierShippingOptionById(id) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/api/shipping-options/", process.env.CORE_API_URL);
    url.pathname += `${id}/`;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-shipping-option"] },
    });

    if (!rawResponse.ok) {
      throw new Error(
        `Failed to fetch shipping option. Status: ${rawResponse.status}`,
      );
    }

    const shippingOption = await rawResponse.json();

    // Check if shipping option content exists
    if (!shippingOption) {
      console.warn("Shipping option content not found");
      return undefined;
    }

    return shippingOption;
  } catch (error) {
    console.error("Error fetching shipping option:", error);
    throw error;
  }
}
