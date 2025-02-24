import { ChatFormInput } from "@/features/supplier/inbox/components/chat-form-input";
import { ChatHeader } from "@/features/supplier/inbox/components/chat-header";
import { ChatMessages } from "@/features/supplier/inbox/components/chat-messages";
import { getSupplierSettings } from "@/lib/api/get-supplier-settings";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default Page;

async function Page({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const settings = await getSupplierSettings();

  const id = params.id;

  const conversation = await getSupplierConversation(id);

  if (!conversation) {
    notFound();
  }

  return (
    <>
      <ChatHeader receiverEmail={conversation.other_user} />

      <ChatMessages
        receiverEmail={conversation.other_user}
        senderId={settings.user_id}
        messages={conversation.messages}
      />

      <div className="p-2 sm:p-4">
        <ChatFormInput
          receiverId={conversation.other_user_id}
          senderId={settings.user_id}
          label={conversation.label}
        />
      </div>
    </>
  );
}

async function getSupplierConversation(conversationId) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/chat/api/conversations/", process.env.CORE_API_URL);
    url.searchParams.set("archived", false);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-conversation"] },
    });

    if (!rawResponse.ok) {
      throw new Error(
        `Failed to fetch conversation. Status: ${rawResponse.status}`,
      );
    }

    const conversations = await rawResponse.json();

    const conversation = conversations.find(
      (conversation) => conversation.label === conversationId,
    );

    // Check if order content exists
    if (!conversation) {
      console.warn("Conversation content not found");
      return undefined;
    }

    return conversation;
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
}
