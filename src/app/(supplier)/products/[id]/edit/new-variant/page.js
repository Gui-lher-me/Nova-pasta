import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { PageWrapper } from "@/components/page-wrapper";
import { NewVariantForm } from "@/features/supplier/products/components/forms/new-variant-form";
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
    <PageWrapper narrowWidth title="New variant">
      <Card>
        <CardHeader>
          <CardTitle>New variant</CardTitle>
        </CardHeader>
        <CardContent>
          <NewVariantForm productId={id} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
