import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { PageWrapper } from "@/components/page-wrapper";
import { OrderShippedForm } from "@/features/supplier/orders/components/order-shipped-form";

export default Page;

async function Page({ params }) {
  const id = params.id;

  return (
    <PageWrapper narrowWidth title="Confirmation">
      <Card>
        <CardHeader>
          <CardTitle>Shipping confirmation</CardTitle>
          <CardDescription>Confirm that this order is shipped</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderShippedForm orderId={id} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
