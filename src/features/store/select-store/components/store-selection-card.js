import { AccountPopover } from "@/components/account-popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { StoreTile } from "@/components/store-title";
import { COOKIE_NAMES } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function StoreSelectionCard({ stores, email }) {
  const logout = async () => {
    "use server";

    // Delete all access token cookies
    COOKIE_NAMES.forEach((cookie) => cookies().delete(cookie));

    redirect("/auth/?mode=login");
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>Select a store</CardTitle>
        <AccountPopover
          name={email}
          image="https://res.cloudinary.com/dropcommerce/image/upload/h_350/v1726695690/znmuh66nd7iurusfqf0r.jpg"
          accountType="store"
          logout={logout}
        ></AccountPopover>
      </CardHeader>
      <CardContent>
        {stores.map((store) => (
          <StoreTile
            key={store.id}
            href={`/store/${store.id}/dashboard`}
            name={store.name}
            platform={store.platform}
            className="border border-gray-200 dark:border-neutral-700"
          >
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
              {store.name}
            </h4>
          </StoreTile>
        ))}
      </CardContent>
    </Card>
  );
}
