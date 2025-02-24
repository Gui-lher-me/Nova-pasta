import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { ShippingForm } from "@/features/supplier/settings/shippings/components/forms/shipping-form";
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

  const productId = searchParams.product_id;

  return (
    <div className="mx-auto my-4 max-w-4xl px-4 sm:my-10 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>New shipping rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ShippingForm
            supplierCountry={settings.country}
            defaultValues={undefined}
            productId={productId}
            isAttachedToProduct={!!productId}
          />
        </CardContent>
      </Card>
    </div>
  );
}
