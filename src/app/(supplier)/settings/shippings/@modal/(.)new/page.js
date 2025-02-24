import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/components/modal";
import { ShippingForm } from "@/features/supplier/settings/shippings/components/forms/shipping-form";
import { getSupplierSettings } from "@/lib/api/get-supplier-settings";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

async function Page({ searchParams }) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const settings = await getSupplierSettings();

  const productId = searchParams.product_id;

  return (
    <Modal>
      <ModalHeader>
        <ModalTitle>New shipping rate</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <ShippingForm
          supplierCountry={settings.country}
          defaultValues={undefined}
          productId={productId}
          isAttachedToProduct={!!productId}
        />
      </ModalContent>
    </Modal>
  );
}
