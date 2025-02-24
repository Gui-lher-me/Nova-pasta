import { EmptyStateIcon } from "@/icons";
import { cn } from "@/lib/utils";

export function Table({
  resourceName,
  headings,
  itemCount,
  emptyState,
  children,
}) {
  if (itemCount === 0)
    return emptyState ?? <EmptyState resourceName={resourceName} />;

  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
      <thead className="bg-gray-50 dark:bg-neutral-800">
        <tr>
          {headings.map((heading) => (
            <th key={heading} scope="col" className="px-6 py-3 text-start">
              <div className="flex items-center gap-x-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                  {heading}
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
        {children}
      </tbody>
    </table>
  );
}

Table.Row = TableRow;
Table.Cell = TableCell;

function TableRow({ children }) {
  return (
    <tr className="bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800">
      {children}
    </tr>
  );
}

function TableCell({ children, className }) {
  return (
    <td
      className={cn(
        "size-px whitespace-nowrap align-top",
        className ? className : "",
      )}
    >
      <span className="block p-6">{children}</span>
    </td>
  );
}

function EmptyState({ resourceName }) {
  return (
    <div className="mx-auto flex min-h-[400px] w-full max-w-sm flex-col justify-center px-6 py-4">
      <div className="flex size-[46px] items-center justify-center rounded-lg bg-gray-100 dark:bg-neutral-800">
        <EmptyStateIcon />
      </div>
      <h2 className="mt-5 font-semibold text-gray-800 dark:text-white">
        No {resourceName.plural} to show
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
        Looks like there are currently no {resourceName.plural} to show.
      </p>
    </div>
  );
}
