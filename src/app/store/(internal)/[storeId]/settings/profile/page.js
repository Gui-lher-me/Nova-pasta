import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { PageWrapper } from "@/components/page-wrapper";
import { ProfileForm } from "@/features/store/settings/profile/components/forms/profile-form";
import { ResetPasswordForm } from "@/features/store/settings/profile/components/forms/reset-password-form";
import { getStoreSettings } from "@/lib/api/get-store-settings";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const settings = await getStoreSettings();

  return (
    <PageWrapper narrowWidth title="Profile">
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm settings={settings} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
