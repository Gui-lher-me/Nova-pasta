import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { PageWrapper } from "@/components/page-wrapper";
import { AppealForm } from "@/features/supplier/reviews/components/appeal-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

function Page({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const id = params.id;

  return (
    <PageWrapper narrowWidth title="Appeal review">
      <Card>
        <CardHeader>
          <CardTitle>Request review appeal for Ivan at Dropcommerce</CardTitle>
          <CardDescription>
            Not all reviews are fair. We understand. If you disagree with this
            review, please let us know your reasons. Our customer success
            department will take a look and remove the review if it offends our
            internal policy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AppealForm supplierId={id} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
