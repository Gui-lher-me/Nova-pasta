import {
  DisabledIcon,
  LoadingIcon,
  SuccessIcon,
  WarningIcon,
  XIcon,
} from "@/icons";
import { cn } from "@/lib/utils";

export function Badge({ children, status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-x-1 rounded-full px-1.5 py-1 text-xs font-medium",
        status === "success"
          ? "bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500"
          : "",
        status === "loading"
          ? "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-500"
          : "",
        status === "disabled"
          ? "bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-500"
          : "",
        status === "warning"
          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500"
          : "",
        status === "error"
          ? "bg-yellow-100 text-red-800 dark:bg-red-500/10 dark:text-red-500"
          : "",
      )}
    >
      {status === "success" ? <SuccessIcon /> : null}
      {status === "loading" ? <LoadingIcon /> : null}
      {status === "disabled" ? <DisabledIcon /> : null}
      {status === "warning" ? <WarningIcon /> : null}
      {status === "error" ? <XIcon className="size-3" /> : null}
      {children}
    </span>
  );
}
