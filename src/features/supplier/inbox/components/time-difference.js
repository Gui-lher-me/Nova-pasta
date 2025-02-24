import { formatTimeDifference } from "../utils/inbox";

export function TimeDifference({ lastMessageTimestamp }) {
  const timeDiff = formatTimeDifference(lastMessageTimestamp);

  return <span className="text-xs text-muted-foreground">{timeDiff}</span>;
}
