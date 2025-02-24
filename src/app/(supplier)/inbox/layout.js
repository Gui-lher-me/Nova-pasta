import { ChatSidebar } from "@/features/supplier/inbox/components/chat-sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const conversations = await getSupplierConversations();

  return (
    <main className="h-full">
      <div className="mx-auto h-full max-w-[85rem]">
        <div className="flex h-full w-full">
          <ChatSidebar conversations={conversations} />
          <div className="flex flex-1 flex-col">{children}</div>
        </div>
      </div>
    </main>
  );
}

async function getSupplierConversations() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/chat/api/conversations/", process.env.CORE_API_URL);
    url.searchParams.set("archived", false);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-conversations"] },
    });

    if (!rawResponse.ok) {
      throw new Error(
        `Failed to fetch conversations. Status: ${rawResponse.status}`,
      );
    }

    const conversations = await rawResponse.json();

    return conversations;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
}
