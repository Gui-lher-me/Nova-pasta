"use client";

import { useEffect, useRef } from "react";
import { ReceiverChatBubble } from "./receiver-chat-bubble";
import { SenderChatBubble } from "./sender-chat-bubble";

export function ChatMessages({ receiverEmail, senderId, messages }) {
  // Create a ref for the scrollable container
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when the component mounts or messages change
    if (messages.length > 0 && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto border-b px-2 py-6 md:px-4"
    >
      <div className="flex w-full flex-col gap-4">
        {messages.map((message) =>
          message.sender_id === senderId ? (
            <SenderChatBubble key={message.id} message={message} />
          ) : (
            <ReceiverChatBubble
              key={message.id}
              receiverEmail={receiverEmail}
              message={message}
            />
          ),
        )}
      </div>
    </div>
  );
}
