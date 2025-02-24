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
import { ActionButton } from "@/features/admin/prebuilts/components/buttons/action-button";
import { addHttpsIfNeeded, formattedDate } from "@/lib/utils";
import { Building, Calendar, ExternalLink, Mail } from "lucide-react";
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

  const promise = getPrebuilt(id);

  return (
    <Suspense
      fallback={
        <PageWrapper>
          <p>Loading...</p>
        </PageWrapper>
      }
    >
      <PrebuiltDataFetcher promise={promise} />
    </Suspense>
  );
}

async function PrebuiltDataFetcher({ promise }) {
  const prebuilt = await promise;

  return (
    <PageWrapper
      title={`PremadeStore ${prebuilt.id} - ${prebuilt.store_type}`}
      titleMetadata={
        <Badge status={prebuilt.completed}>{prebuilt.store_id}</Badge>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{formattedDate.format(new Date(prebuilt.date))}</CardTitle>
          <CardDescription>
            Package: {prebuilt.package} (Store: {prebuilt.store_id || "-"})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-neutral-700">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-neutral-400">
                <Building className="mr-2 h-5 w-5" />
                Owner Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                {prebuilt.owner_email}
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
                  href={addHttpsIfNeeded(prebuilt.website)}
                  target="_blank"
                >
                  {prebuilt.website}
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
                  href={`mailto:${prebuilt.email}`}
                  className="text-primary-600 underline hover:text-primary-500 hover:decoration-2 focus:decoration-2 focus:outline-none dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {prebuilt.email}
                </Link>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-neutral-400">
                <Calendar className="mr-2 h-5 w-5" />
                Notes
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">
                {prebuilt.notes}
              </dd>
            </div>
          </dl>
        </CardContent>
        <CardFooter justifyEnd>
          {prebuilt.steps.map((step, idx) => (
            <ActionButton
              key={step.id || idx}
              id={prebuilt.id}
              action={step.name}
              value={step.value}
            />
          ))}
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}

async function getPrebuilt(id) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin_access_token")?.value;

    const url = new URL(
      "/api/admin/prebuilts/", // needs a trailing slash
      process.env.CORE_API_URL,
    );
    url.pathname += `${id}/`;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to fetch prebuilt");
    }

    const prebuilt = await rawResponse.json();

    return prebuilt;
  } catch (error) {
    console.error("Error fetching prebuilt:", error);
    throw error;
  }
}
