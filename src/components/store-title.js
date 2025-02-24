import { cn, getInitials } from "@/lib/utils";
import Link from "next/link";
import { Avatar } from "./avatar";

export const StoreTile = ({
  href,
  name,
  platform,
  children,
  className,
  isActive,
}) => (
  <Link href={href}>
    <div
      className={cn(
        "flex items-center gap-x-3 rounded-xl bg-white p-3 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        className,
        isActive && "ring-2 ring-primary-500",
      )}
    >
      <Avatar initials={getInitials(name)} />
      <div className="grow">
        {children}
        <p className="text-sm text-gray-800 dark:text-white md:text-gray-500 md:dark:text-neutral-500">
          {platform}
        </p>
      </div>
    </div>
  </Link>
);
