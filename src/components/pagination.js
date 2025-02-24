"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({
  // count,
  // items_per_page,
  pages,
  page,
  // first_item,
  // last_item,
}) {
  const pathname = usePathname();
  const searchParams = Object.fromEntries(useSearchParams());
  const currentPage =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const totalPages = pages;
  const displayRange = 2; // Number of pages to show before and after the current page

  // Calculate the range of pages to display
  const startPage = Math.max(page - displayRange, 1);
  const endPage = Math.min(page + displayRange, totalPages);

  return (
    <div className="px-4 py-1">
      <nav
        className="flex items-center justify-center gap-x-1 sm:justify-start"
        aria-label="Pagination"
      >
        <Link
          href={{
            pathname,
            query: {
              ...searchParams,
              page: currentPage > 1 ? currentPage - 1 : 1,
            },
          }}
          className={`inline-flex min-w-[40px] items-center justify-center gap-x-2 rounded-full p-2.5 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
            page === 1 ? "pointer-events-none opacity-50" : ""
          }`}
          aria-label="Previous"
          aria-disabled={page === 1}
          tabIndex={page === 1 ? "-1" : undefined}
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </Link>
        <div className="flex items-center gap-x-1">
          {/* Show the page range, including two previous and two next pages */}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNum = startPage + index;
            return (
              <Link
                key={pageNum}
                href={{
                  pathname,
                  query: {
                    ...searchParams,
                    page: pageNum,
                  },
                }}
                className={`flex min-w-[40px] items-center justify-center rounded-full py-2.5 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                  pageNum === page ? "bg-gray-100 dark:bg-neutral-700" : ""
                }`}
                aria-current={pageNum === page ? "page" : undefined}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>
        <Link
          href={{
            pathname,
            query: {
              ...searchParams,
              page: currentPage + 1,
            },
          }}
          className={`inline-flex min-w-[40px] items-center justify-center gap-x-2 rounded-full p-2.5 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
            page === totalPages ? "pointer-events-none opacity-50" : ""
          }`}
          aria-label="Next"
          aria-disabled={page === totalPages}
          tabIndex={page === totalPages ? "-1" : undefined}
        >
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </Link>
      </nav>
    </div>
  );
}
