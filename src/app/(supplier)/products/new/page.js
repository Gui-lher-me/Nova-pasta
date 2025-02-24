import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { PageWrapper } from "@/components/page-wrapper";
import { NewProductForm } from "@/features/supplier/products/components/forms/new-product-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  return (
    <PageWrapper narrowWidth title="New product">
      <Card>
        <CardHeader>
          <CardTitle>New product</CardTitle>
        </CardHeader>
        <CardContent>
          <NewProductForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
