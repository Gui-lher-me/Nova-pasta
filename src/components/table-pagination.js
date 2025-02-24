"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "./button";

export function TablePagination({ totalPages, hasNextPage: hasNext }) {
  const pathname = usePathname();
  const searchParams = Object.fromEntries(useSearchParams());
  const currentPage =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const lastPage = totalPages;
  const nextPage = (current, total) => {
    if (current <= lastPage) return current + 1;
    return -1;
  };
  const prevPage = (current, total) => {
    if (current === 1) return -1;
    return current - 1;
  };
  const getButtonStyle = (current, total, func) => {
    if (func(current, total) === -1)
      return { pointerEvents: "none", color: "lightgray" };
    return {};
  };
  const hasNextPage = nextPage <= totalPages || hasNext;

  return (
    <div className="flex items-center justify-between gap-3 border-t border-gray-200 px-6 py-4 dark:border-neutral-700">
      <div className="max-w-sm space-y-3"></div>
      <div className="inline-flex gap-x-2">
        <Button variant="outline" asChild>
          <Link
            style={getButtonStyle(currentPage, totalPages, prevPage)}
            href={{
              pathname,
              query: {
                ...searchParams,
                page: prevPage(currentPage, totalPages),
              },
            }}
          >
            <ArrowLeftIcon />
            Previous
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            style={{ borderColor: "darkgray" }}
            href={{ pathname, query: { ...searchParams, page: currentPage } }}
          >
            {currentPage}
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
          disabled={nextPage(currentPage, totalPages) === -1}
        >
          <Link
            style={getButtonStyle(currentPage, totalPages, nextPage)}
            href={{
              pathname,
              query: {
                ...searchParams,
                page: nextPage(currentPage, totalPages),
              },
            }}
          >
            Next
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}
