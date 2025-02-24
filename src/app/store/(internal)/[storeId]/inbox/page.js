import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default Page;

function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  return (
    <main>
      <div className="mx-auto max-w-[85rem] p-4 pb-10 sm:p-6 lg:p-8 lg:pb-14">
        <p>Inbox</p>
      </div>
    </main>
  );
}
