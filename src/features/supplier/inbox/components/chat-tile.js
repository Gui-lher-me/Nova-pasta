import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// I'm not using SSR because I need to ensure consistent time calculations
// on the client side, avoiding discrepancies between server and client timestamps.
const NoSSRTimeDifference = dynamic(
  () => import("./time-difference").then((mod) => mod.TimeDifference),
  {
    ssr: false,
  },
);

export function ChatTile({ conversation }) {
  // let startTime = performance.now();
  // while (performance.now() - startTime < 1) {}

  const params = useParams();

  const messages = conversation.messages;

  // Calculate time since last message
  const lastMessageTimestamp = new Date(
    messages[messages.length - 1].sent_timestamp,
  );

  // Calculate last message
  const lastMessage = messages[messages.length - 1].text;

  // Calculate unread messages
  let unread = 0;
  messages.forEach((message) => {
    if (message.read_timestamp === null) {
      unread++;
    }
  });

  const isSelected = conversation.label === params.id;

  return (
    <Link href={`/inbox/${conversation.label}`}>
      <div
        className={`mt-1 flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-muted/50 ${
          isSelected ? "bg-muted" : ""
        }`}
      >
        <Image
          className="size-10 rounded-full object-cover"
          src="https://res.cloudinary.com/dropcommerce/image/upload/h_350/v1726695690/znmuh66nd7iurusfqf0r.jpg"
          alt="User image"
          width={40}
          height={40}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between">
            <h3 className="truncate text-sm font-semibold">
              {conversation.other_user}
            </h3>
            <NoSSRTimeDifference lastMessageTimestamp={lastMessageTimestamp} />
          </div>
          <p className="truncate text-sm text-muted-foreground">
            {lastMessage}
          </p>
        </div>
        {unread > 0 && (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs text-primary-foreground">
            {unread}
          </div>
        )}
      </div>
    </Link>
  );
}
