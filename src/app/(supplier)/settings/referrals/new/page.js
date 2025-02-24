import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { PageWrapper } from "@/components/page-wrapper";
import { NewReferralForm } from "@/features/supplier/settings/referrals/components/new-referral-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  return (
    <PageWrapper narrowWidth title="Referral">
      <Card>
        <CardHeader>
          <CardTitle>Refer vendors & suppliers to DropCommerce</CardTitle>
          <CardDescription>
            Earn 1 free week of in-app promotion for each store who signs up for
            a paid plan or supplier who goes live in the public marketplace!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewReferralForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
