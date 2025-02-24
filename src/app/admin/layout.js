import { Header } from "@/components/header";
import { MobileHeader } from "@/components/mobile-header";
import { NavLink } from "@/components/nav-link";
import { Sidebar } from "@/components/sidebar";
import { adminPages } from "@/constants";

export default function Layout({ children }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Header
        accountName="DropCommerce"
        accountLogo={undefined}
        accountType="Admin"
      />
      <MobileHeader />
      <Sidebar>
        {adminPages.map((page) => (
          <li key={page.destination}>
            <NavLink className="px-2.5 text-gray-700" href={page.destination}>
              {page.icon}
              {page.label}
              {/* <NotificationDot content="99+" /> */}
            </NavLink>
          </li>
        ))}
      </Sidebar>
      <div className="absolute inset-0 top-[114.8px] overflow-hidden overflow-y-auto sm:top-[126.8px] lg:top-[75.6px] lg:ms-64">
        {children}
      </div>
    </div>
  );
}
