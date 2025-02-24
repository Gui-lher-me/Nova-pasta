import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { PageWrapper } from "@/components/page-wrapper";
import { VendorCardFooter } from "@/features/supplier/vendors/components/vendor-card-footer";
import { formattedCurrency } from "@/lib/utils";
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

  const vendor = await getVendor(id);

  if (!vendor) {
    notFound();
  }

  return (
    <PageWrapper title="Vendor details">
      <Card>
        <CardHeader>
          <CardTitle>{vendor.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <div className="grid space-y-3">
                {!vendor.store && (
                  <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
                    <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                      Pending:
                    </dt>
                    <dd className="font-medium text-gray-800 dark:text-neutral-200">
                      This vendor has not registered yet.
                    </dd>
                  </dl>
                )}
                {vendor.store && (
                  <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
                    <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                      Order volume:
                    </dt>
                    <dd className="font-medium text-gray-800 dark:text-neutral-200">
                      {formattedCurrency.format(vendor.order_volume)}
                    </dd>
                  </dl>
                )}
                <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Currency:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    USD - US Dollar
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </CardContent>
        <VendorCardFooter id={vendor.id} status={vendor.status} />
      </Card>
    </PageWrapper>
  );
}

async function getVendor(id) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/api/vendors/", process.env.CORE_API_URL);
    url.pathname += `${id}/`;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["vendor"] },
    });

    if (!rawResponse.ok) {
      throw new Error(`Failed to fetch vendor. Status: ${rawResponse.status}`);
    }

    const vendor = await rawResponse.json();

    // Check if vendor content exists
    if (!vendor) {
      console.warn("Vendor content not found");
      return undefined;
    }

    return vendor;
  } catch (error) {
    console.error("Error fetching vendor:", error);
    throw error;
  }
}
