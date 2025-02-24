import { Badge } from "@/components/badge";
import { Slot } from "@radix-ui/react-slot";

export function IntegrationCard({ children }) {
  return (
    <div className="group relative flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-700/70">
      {children}
    </div>
  );
}

export function IntegrationCardHeader({ children }) {
  return <div className="flex-1 p-4 md:p-6">{children}</div>;
}

export function IntegrationCardImageWrapper({ children }) {
  return (
    <div className="flex h-52 flex-col items-center justify-center rounded-t-xl bg-transparent">
      {children}
    </div>
  );
}

export function IntegrationCardIntegrationInfo({ children }) {
  return (
    <span className="mb-1 block text-xs font-semibold uppercase">
      {children}
    </span>
  );
}

export function IntegrationCardTitle({ children }) {
  return (
    <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
      {children}
    </h3>
  );
}

export function IntegrationCardDescription({ children }) {
  return <p className="mt-3 text-gray-500 dark:text-neutral-500">{children}</p>;
}

export function IntegrationCardContent({ children }) {
  return children;
}

export function IntegrationCardBadge({ status, children }) {
  return (
    <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
      <Badge status={status}>{children}</Badge>
    </div>
  );
}

export function IntegrationCardFooter({ children }) {
  return (
    <div className="mt-auto flex divide-x divide-gray-200 border-t border-gray-200 dark:divide-neutral-700 dark:border-neutral-700">
      {children}
    </div>
  );
}

export function IntegrationCardButton({ asChild, children, ...rest }) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className="inline-flex w-full items-center justify-center gap-x-2 rounded-ee-xl rounded-es-xl bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      {...rest}
    >
      {children}
    </Component>
  );
}
