import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { DangerAlert } from "@/components/danger-alert";
import { PageWrapper } from "@/components/page-wrapper";
import { ValuesForm } from "@/features/supplier/settings/values/components/values-form";
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
    <PageWrapper narrowWidth title="Values">
      {supplierWarnings.values && (
        <DangerAlert>
          <span id="hs-soft-color-danger-label" className="font-bold">
            Action required:
          </span>{" "}
          Please select at least one value to proceed.
        </DangerAlert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Supplier values</CardTitle>
          <CardDescription>
            Indicate which values apply to your business. This information will
            be displayed as a special badge on your profile. This will be
            checked for accuracy, so please only select relevant features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ValuesForm settings={settings} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
