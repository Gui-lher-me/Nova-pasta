import { Card, CardContent } from "@/components/card";
import { DangerAlert } from "@/components/danger-alert";
import { ProfileForm } from "@/features/supplier/settings/profile/components/profile-form";
import { ProfilePageWrapper } from "@/features/supplier/settings/profile/components/profile-page-wrapper";
import { SupplierBanner } from "@/features/supplier/settings/profile/components/supplier-banner";
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
    <ProfilePageWrapper>
      {supplierWarnings.profile_settings && (
        <DangerAlert>
          <span id="hs-soft-color-danger-label" className="font-bold">
            Incomplete profile:
          </span>{" "}
          Essential details like logo, short description, description, and
          return policy are missing.
        </DangerAlert>
      )}
      <Card>
        <CardContent>
          <SupplierBanner settings={settings} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <ProfileForm settings={settings} />
        </CardContent>
      </Card>
    </ProfilePageWrapper>
  );
}
