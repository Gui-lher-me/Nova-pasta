"use client";

import { SearchInput } from "@/components/search-input";
import { useDeferredValue, useState } from "react";
import { ChatTile } from "./chat-tile";

export function ChatSidebar({ conversations }) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  // Derived state for filtered conversations
  const filteredConversations = conversations.filter(
    // eslint-disable-next-line no-unused-vars
    (conversation, idx, self) =>
      conversation.other_user
        .toLowerCase()
        .includes(deferredSearch.toLowerCase()),
  );

  return (
    <div
      className={`fixed left-0 h-full transform overflow-y-auto border-r p-4 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        !true ? "w-full translate-x-0" : "w-full -translate-x-full sm:w-[446px]"
      } shrink-0`}
    >
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      <div role="list" className="mt-6 divide-y">
        {filteredConversations.map((conversation) => (
          <ChatTile key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
}
