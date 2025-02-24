import { cn } from "@/lib/utils";

export function Card({ children, className = "" }) {
  return (
    <div
      className={cn(
        "relative grid gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow dark:border-neutral-700 dark:bg-neutral-900 sm:gap-4 sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

export function CardTitle({ children }) {
  return (
    <h2 className="mb-2 text-base font-medium text-gray-800 dark:text-neutral-200">
      {children}
    </h2>
  );
}

export function CardDescription({ children }) {
  return (
    <p className="text-sm text-gray-600 dark:text-neutral-400">{children}</p>
  );
}

export function CardContent({ children, className }) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ justifyEnd, children }) {
  return (
    <div
      className={cn("flex flex-wrap gap-2", justifyEnd ? "justify-end" : "")}
    >
      {children}
    </div>
  );
}
