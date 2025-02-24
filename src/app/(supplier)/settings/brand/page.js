import { Card, CardContent } from "@/components/card";
import { DangerAlert } from "@/components/danger-alert";
import { PageWrapper } from "@/components/page-wrapper";
import { PackagingForm } from "@/features/supplier/settings/brand/components/packaging-form";
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
    <PageWrapper narrowWidth title="Packaging & branding">
      {supplierWarnings.branding_description && (
        <DangerAlert>
          <span id="hs-soft-color-danger-label" className="font-bold">
            Brand description missing:
          </span>{" "}
          Please provide a brand description to proceed.
        </DangerAlert>
      )}
      <Card>
        <CardContent>
          <PackagingForm settings={settings} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
