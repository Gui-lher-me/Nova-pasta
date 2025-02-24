"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function StoreNavLink({ children, className, href, ...rest }) {
  const pathname = usePathname();
  const params = useParams();

  const storeId = params.storeId;

  const isActive = pathname.split("/").pop() === href.split("/?").shift();

  return (
    <Link
      href={`/store/${storeId}/${href}`}
      className={cn(
        "flex items-center gap-x-3.5 rounded-lg py-2 text-sm hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300",
        isActive ? "bg-gray-100 dark:bg-neutral-700" : "",
        className,
      )}
      target={href.startsWith("http") ? "_blank" : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}
