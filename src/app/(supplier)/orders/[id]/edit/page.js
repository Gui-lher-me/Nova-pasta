import { OrderDetails } from "@/features/supplier/orders/components/order-details";
import { OrderFooter } from "@/features/supplier/orders/components/order-footer";
import { OrderItemsTable } from "@/features/supplier/orders/components/order-items-table";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default Page;

async function Page({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const id = params.id;

  const order = await getSupplierOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <main>
      <div className="mx-auto my-4 max-w-[85rem] px-4 sm:my-10 sm:px-6 lg:px-8">
        <OrderDetails
          name={order.name}
          status={order.status}
          packingSlip={order.packing_slip}
          createdAt={order.created_at}
          shippingAddress={order.shipping_address}
        />

        <OrderItemsTable items={order.products} />

        <OrderFooter
          note={order.note}
          shippingCharge={order.shipping_charge}
          subtotal={order.subtotal}
          total={order.total}
          stripeFee={order.stripe_fee}
          payoutAmount={order.payout_amount}
        />
      </div>
    </main>
  );
}

async function getSupplierOrder(id) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/supplier_order/", process.env.CORE_API_URL);
    url.searchParams.set("id", id);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-order"] },
    });

    if (!rawResponse.ok) {
      throw new Error(`Failed to fetch order. Status: ${rawResponse.status}`);
    }

    const order = await rawResponse.json();

    // Check if order content exists
    if (!order?.order) {
      console.warn("Order content not found");
      return undefined;
    }

    return order.order;
  } catch (error) {
    console.error("Error fetching supplier order:", error);
    throw error;
  }
}
