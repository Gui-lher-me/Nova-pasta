import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { DangerAlert } from "@/components/danger-alert";
import { PageWrapper } from "@/components/page-wrapper";
import { PaymentsList } from "@/features/supplier/settings/integrations/components/lists/payments-list";
import { PlatformsList } from "@/features/supplier/settings/integrations/components/lists/platforms-list";
import { getSupplierSettings } from "@/lib/api/get-supplier-settings";
import { getSupplierWarnings } from "@/lib/utils";
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

  const supplierWarnings = getSupplierWarnings(settings);

  return (
    <PageWrapper title="Integrations">
      {!!supplierWarnings.payment && (
        <DangerAlert>
          <span id="hs-soft-color-danger-label" className="font-bold">
            Payment setup required:
          </span>{" "}
          Please connect a Stripe or PayPal account to proceed.
        </DangerAlert>
      )}
      <Card className="bg-transparent shadow-none dark:bg-transparent">
        <CardHeader>
          <CardTitle>Payment gateways</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentsList
            isStripeConnected={settings.stripe_id_saved}
            paypalId={settings.merchant_id}
          />
        </CardContent>
      </Card>
      <Card className="bg-transparent shadow-none dark:bg-transparent">
        <CardHeader>
          <CardTitle>Ecommerce platforms</CardTitle>
        </CardHeader>
        <CardContent>
          <PlatformsList
            shopifyUrl={settings.shopify_url}
            shopifyTokenSaved={settings.shopify_token_saved}
          />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
