import { cn } from "@/lib/utils";

export function Spinner({ className = "" }) {
  return (
    <div
      className={cn(
        "size-5 animate-spin rounded-full border-[3px] border-current border-t-transparent",
        className,
      )}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Please wait...</span>
    </div>
  );
}
