import { formattedTime } from "@/lib/utils";
import Image from "next/image";

export function ReceiverChatBubble({ receiverEmail, message }) {
  return (
    <div className="flex items-end gap-2">
      <Image
        className="size-8 rounded-full object-cover"
        src="https://res.cloudinary.com/dropcommerce/image/upload/h_350/v1726695690/znmuh66nd7iurusfqf0r.jpg"
        alt="avatar"
        width={32}
        height={32}
      />
      <div className="mr-auto flex max-w-[70%] flex-col gap-2 rounded-r-md rounded-tl-md bg-neutral-50 p-4 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300 md:max-w-[60%]">
        <span className="font-semibold text-neutral-900 dark:text-white">
          {receiverEmail}
        </span>
        <div className="text-sm">{message.text}</div>
        <span className="ml-auto text-xs">
          {formattedTime.format(new Date(message.sent_timestamp))}
        </span>
      </div>
    </div>
  );
}
