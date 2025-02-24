export function NotificationDot({ content }) {
  return (
    <span className="inline-flex items-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
      {content}
    </span>
  );
}
