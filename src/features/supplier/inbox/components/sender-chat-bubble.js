import { formattedTime } from "@/lib/utils";

export function SenderChatBubble({ message }) {
  return (
    <div className="flex items-end gap-2">
      <div className="ml-auto flex max-w-[70%] flex-col gap-2 rounded-l-xl rounded-tr-xl bg-primary-500 p-4 text-sm text-neutral-100 dark:bg-white dark:text-black md:max-w-[60%]">
        {message.text}
        <span className="ml-auto text-xs">
          {formattedTime.format(new Date(message.sent_timestamp))}
        </span>
      </div>
    </div>
  );
}
