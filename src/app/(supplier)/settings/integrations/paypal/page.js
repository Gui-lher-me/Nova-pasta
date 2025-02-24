import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { PageWrapper } from "@/components/page-wrapper";
import { PayPalConnectionForm } from "@/features/supplier/settings/integrations/components/forms/paypal-connection-form";
import { getSupplierSettings } from "@/lib/api/get-supplier-settings";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const settings = await getSupplierSettings();

  return (
    <PageWrapper narrowWidth title="PayPal">
      <Card>
        <CardHeader>
          <CardTitle>PayPal connection</CardTitle>
        </CardHeader>
        <CardContent>
          <PayPalConnectionForm merchantId={settings.merchant_id} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
