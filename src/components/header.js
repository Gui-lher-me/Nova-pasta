import { COOKIE_NAMES } from "@/constants";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AccountPopover } from "./account-popover";

const NoSSRToggleThemeButton = dynamic(
  () => import("./toggle-theme-button").then((mod) => mod.ToggleThemeButton),
  {
    ssr: false,
  },
);

export function Header({ accountName, accountLogo, accountType, children }) {
  const logout = async () => {
    "use server";

    // Delete all access token cookies
    COOKIE_NAMES.forEach((cookie) => cookies().delete(cookie));

    redirect("/auth/?mode=login");
  };

  return (
    <header className="sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-white py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 sm:flex-nowrap sm:justify-start sm:py-4 lg:ps-64">
      <nav
        className="mx-auto flex w-full basis-full items-center px-4 sm:px-6"
        aria-label="Global"
      >
        <div className="me-5 lg:me-0 lg:hidden">
          <div className="inline-block flex-none rounded-xl text-xl font-semibold text-primary-500 focus:opacity-80 focus:outline-none">
            DropCommerce
          </div>
        </div>
        <div className="ms-auto flex w-full items-center justify-end sm:order-3 sm:justify-between sm:gap-x-3">
          <div />
          <div className="flex flex-row items-center justify-end gap-2">
            <NoSSRToggleThemeButton />
            <AccountPopover
              name={accountName}
              image={
                accountLogo ||
                "https://res.cloudinary.com/dropcommerce/image/upload/h_350/v1726695690/znmuh66nd7iurusfqf0r.jpg"
              }
              accountType={accountType}
              logout={logout}
            >
              {children}
            </AccountPopover>
          </div>
        </div>
      </nav>
    </header>
  );
}
