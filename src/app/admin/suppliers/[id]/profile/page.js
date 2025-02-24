import { Badge } from "@/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { PageWrapper } from "@/components/page-wrapper";
import { ApproveButton } from "@/features/admin/suppliers/components/buttons/approve-button";
import { DeactivateButton } from "@/features/admin/suppliers/components/buttons/deactivate-button";
import { ImpersonateButton } from "@/features/admin/suppliers/components/buttons/impersonate-button";
import { SetLiveButton } from "@/features/admin/suppliers/components/buttons/set-live-button";
import {
  addHttpsIfNeeded,
  formattedDate,
  getSupplierLabel,
  getSupplierStatus,
} from "@/lib/utils";
import {
  AlertTriangle,
  Building,
  Calendar,
  CheckCircle,
  ExternalLink,
  Mail,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default Page;

function Page({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const id = +params.id;

  const promise = getSupplier(id);

  return (
    <Suspense
      fallback={
        <PageWrapper>
          <p>Loading... grab a snack, this might take a moment!</p>
        </PageWrapper>
      }
    >
      <SupplierDataFetcher promise={promise} />
    </Suspense>
  );
}

async function SupplierDataFetcher({ promise }) {
  const supplier = await promise;

  return (
    <PageWrapper
      title={supplier.name}
      titleMetadata={
        <Badge status={getSupplierStatus(supplier.status)}>
          {getSupplierLabel(supplier.status)}
        </Badge>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Supplier details</CardTitle>
          <CardDescription>Supplier ID: {supplier.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-neutral-700">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-neutral-400">
                <Building className="mr-2 h-5 w-5" />
                Name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                {supplier.name}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-neutral-400">
                <ExternalLink className="mr-2 h-5 w-5" />
                Website
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                <Link
                  className="text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:decoration-2 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-400"
                  href={addHttpsIfNeeded(supplier.website)}
                  target="_blank"
                >
                  {supplier.website}
                </Link>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-neutral-400">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                <Link
                  href={`mailto:${supplier.email}`}
                  className="text-primary-600 underline hover:text-primary-500 hover:decoration-2 focus:decoration-2 focus:outline-none dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {supplier.email}
                </Link>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-neutral-400">
                <Calendar className="mr-2 h-5 w-5" />
                Created at
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                {formattedDate.format(new Date(supplier.created_at))}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-neutral-400">
                {supplier.no_shopify ||
                !supplier.active_shipping_options ||
                supplier.no_values ||
                supplier.no_payment ||
                supplier.profile_incomplete ||
                supplier.product_count === 0 ||
                !supplier.supplier_agreement ||
                supplier.uncategorized_products > 0 ? (
                  <>
                    <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                    Current issues
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    No issues
                  </>
                )}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                {supplier.no_shopify ||
                !supplier.active_shipping_options ||
                supplier.no_values ||
                supplier.no_payment ||
                supplier.profile_incomplete ||
                supplier.product_count === 0 ||
                !supplier.supplier_agreement ||
                supplier.uncategorized_products > 0 ? (
                  <ul className="list-disc space-y-1 pl-5">
                    {supplier.no_shopify && <li>Shopify not connected</li>}
                    {!supplier.active_shipping_options && (
                      <li>No active shipping rates</li>
                    )}
                    {supplier.no_values && <li>No values</li>}
                    {supplier.no_payment && <li>Payment method missing</li>}
                    {supplier.profile_incomplete && <li>Incomplete info</li>}
                    {supplier.product_count === 0 && <li>No products</li>}
                    {!supplier.supplier_agreement && (
                      <li>Agreement not completed</li>
                    )}
                    {/* {supplier.description_links > 0 && (
                      <li>{`${supplier.description_links} products with description links`}</li>
                    )} */}
                    {supplier.uncategorized_products > 0 && (
                      <li>{`${supplier.uncategorized_products} uncategorized products`}</li>
                    )}
                  </ul>
                ) : null}
              </dd>
            </div>
          </dl>
        </CardContent>
        <CardFooter justifyEnd>
          {supplier.status !== "REJECTED" && (
            <DeactivateButton id={supplier.id} />
          )}
          <ImpersonateButton id={supplier.id} />
          {supplier.status === "PENDING" && <ApproveButton id={supplier.id} />}
          {supplier.status === "ONBOARDING" && (
            <SetLiveButton id={supplier.id} />
          )}
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}

async function getSupplier(id) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin_access_token")?.value;

    const url = new URL(
      "/api/admin/suppliers/", // needs a trailing slash
      process.env.CORE_API_URL,
    );
    url.pathname += `${id}/`;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["admin-supplier"] },
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to fetch supplier");
    }

    const supplier = await rawResponse.json();

    return supplier;
  } catch (error) {
    console.error("Error fetching supplier:", error);
    throw error;
  }
}
