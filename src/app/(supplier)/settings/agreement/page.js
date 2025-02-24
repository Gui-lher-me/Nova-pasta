import { Badge } from "@/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { DangerAlert } from "@/components/danger-alert";
import { PageWrapper } from "@/components/page-wrapper";
import { AgreementForm } from "@/features/supplier/settings/agreement/components/agreement-form";
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
    <PageWrapper narrowWidth title="Agreement">
      {supplierWarnings.supplier_agreement && (
        <DangerAlert>
          <span id="hs-soft-color-danger-label" className="font-bold">
            Agreement required:
          </span>{" "}
          You must accept the Supplier agreement to proceed.
        </DangerAlert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Supplier agreement</CardTitle>
          <CardDescription>
            Suppliers are the backbone of DropCommerce. Consistency, profile
            accuracy, fast shipping and communication are integral to your
            success in our marketplace. We appreciate your involvement and your
            commitment to comply with our standards.
            <br />
            If you have any questions, please contact support@dropcommerce.com
            for support.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {settings.supplier_agreement && (
            <div className="absolute right-4 top-4 z-10 sm:right-7 sm:top-7">
              <Badge status="success">Agreed</Badge>
            </div>
          )}
          <AgreementForm agreed={settings.supplier_agreement} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
