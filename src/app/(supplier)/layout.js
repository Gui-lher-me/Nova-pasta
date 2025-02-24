import { Header } from "@/components/header";
import { Intercom } from "@/components/intercom";
import { MobileHeader } from "@/components/mobile-header";
import { NavLink } from "@/components/nav-link";
import { Sidebar } from "@/components/sidebar";
import { SUPPLIER_ACCOUNT_PAGES, supplierPages } from "@/constants";
import { getSupplierSettings } from "@/lib/api/get-supplier-settings";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const settings = await getSupplierSettings();

  const accountName =
    !settings.name || settings.name === "new supplier"
      ? settings.email
      : settings.name;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Header
        accountName={accountName}
        accountLogo={settings.logo}
        accountType="Supplier"
      >
        {SUPPLIER_ACCOUNT_PAGES.map((page) => (
          <NavLink
            key={page.destination}
            className="px-3 text-gray-800 focus:bg-gray-100 focus:outline-none dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
            href={page.destination}
          >
            {page.icon}
            <span className="flex-1">{page.label}</span>
          </NavLink>
        ))}
      </Header>
      <MobileHeader />
      <Sidebar>
        {supplierPages.map((page) => (
          <li key={page.destination}>
            <NavLink className="px-2.5 text-gray-700" href={page.destination}>
              {page.icon}
              {page.label}
              {/* <NotificationDot content="99+" /> */}
            </NavLink>
          </li>
        ))}
      </Sidebar>
      {process.env.NODE_ENV === "production" && (
        <Intercom name={settings.name} email={settings.email} />
      )}
      <div className="absolute inset-0 top-[114.8px] overflow-hidden overflow-y-auto selection:bg-[hsl(320,65%,52%,20%)] sm:top-[126.8px] lg:top-[75.6px] lg:ms-64">
        {children}
      </div>
    </div>
  );
}
