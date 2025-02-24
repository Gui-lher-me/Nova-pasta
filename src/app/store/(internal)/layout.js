import { Header } from "@/components/header";
import { Intercom } from "@/components/intercom";
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";
import { StoreNavLink } from "@/components/store-nav-link";
import { StoreTile } from "@/components/store-title";
import { storePages } from "@/constants";
import { getAccountInfo } from "@/features/store/select-store/server/db/select-store";
import { getStoreSettings } from "@/lib/api/get-store-settings";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  // Fetch both account info and store settings concurrently
  const [data, settings] = await Promise.all([
    getAccountInfo(),
    getStoreSettings(),
  ]);

  const accountName = !settings.store.name
    ? settings.email
    : settings.store.name;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Header
        accountName={accountName}
        accountLogo={undefined}
        accountType="Store"
      >
        <span className="block px-3 py-2 text-xs font-medium uppercase text-gray-400 dark:text-neutral-600">
          My stores
        </span>
        {data?.stores.map((store) => (
          <StoreTile
            key={store.id}
            href={`/store/${store.id}/dashboard`}
            name={store.name}
            platform={store.platform}
          >
            <h4 className="text-xs font-semibold text-gray-800 dark:text-white">
              {store.name}
            </h4>
          </StoreTile>
        ))}
      </Header>
      <MobileHeader />
      <Sidebar>
        {storePages.map((page) => (
          <li key={page.destination}>
            <StoreNavLink
              className="px-2.5 text-gray-700"
              href={page.destination}
            >
              {page.icon}
              {page.label}
              {/* <NotificationDot content="99+" /> */}
            </StoreNavLink>
          </li>
        ))}
      </Sidebar>
      {process.env.NODE_ENV === "production" && (
        <Intercom name={settings.store.name} email={settings.email} />
      )}
      <div className="absolute inset-0 top-[114.8px] overflow-hidden overflow-y-auto sm:top-[126.8px] lg:top-[75.6px] lg:ms-64">
        {children}
      </div>
    </div>
  );
}
