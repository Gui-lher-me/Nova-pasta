import { PageWrapper } from "@/components/page-wrapper";
import { SUPPLIER_SETTINGS_PAGES } from "@/constants";
import { InfoIcon } from "@/icons";
import { getSupplierSettings } from "@/lib/api/get-supplier-settings";
import { getSupplierWarnings } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default Page;

async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const settings = await getSupplierSettings();

  const supplierWarnings = getSupplierWarnings(settings);

  const {
    profile_settings,
    values,
    active_shipping_options,
    branding_description,
    payment,
    supplier_agreement,
  } = supplierWarnings;

  const s = "/settings";

  const settingsPages = SUPPLIER_SETTINGS_PAGES.map((page) => {
    const { destination } = page;
    return {
      ...page,
      warning:
        destination === `${s}/profile`
          ? profile_settings
          : destination === `${s}/values`
            ? values
            : destination === `${s}/shipping`
              ? active_shipping_options
              : destination === `${s}/brand`
                ? branding_description
                : destination === `${s}/integrations`
                  ? !!payment
                  : destination === `${s}/agreement`
                    ? supplier_agreement
                    : false,
    };
  });

  return (
    <PageWrapper
      title="Settings"
      subtitle="Suppliers are responsible for the accuracy of their profiles. Please ensure your settings are correct."
    >
      <div className="grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {settingsPages.map((settingPage) => (
          <Link
            key={settingPage.destination}
            className="group flex size-full gap-y-6 rounded-lg p-5 hover:bg-white focus:bg-white focus:outline-none dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            href={settingPage.destination}
          >
            {settingPage.icon}
            <div>
              <div>
                <div className="flex items-center gap-x-2">
                  <h3 className="block font-bold text-gray-800 dark:text-white">
                    {settingPage.label}
                  </h3>
                  {settingPage.warning && (
                    <InfoIcon className="size-4 text-red-500 dark:text-red-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  {settingPage.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
