import { Badge } from "@/components/badge";
import { Paper } from "@/components/paper";
import { Table } from "@/components/table";
import { TablePagination } from "@/components/table-pagination";
import { SmallStarIcon } from "@/icons";
import Link from "next/link";
import { getReviewLabel, getReviewStatus } from "../utils/reviews";

export function ReviewsTable({ data }) {
  const { results: reviews, next } = data;

  const headings = ["Store", "Rating", "Review", "Status", ""];

  const resourceName = {
    singular: "review",
    plural: "reviews",
  };

  const rowsMarkup = reviews.map((review) => (
    <Table.Row key={review.id}>
      <Table.Cell>
        <span className="block max-w-44 truncate text-sm text-gray-600 dark:text-neutral-400">
          {review.storeName}
        </span>
      </Table.Cell>
      <Table.Cell>
        <div className="flex gap-x-1">
          {new Array(review.rating ?? 0).fill("").map((_, idx) => (
            <SmallStarIcon key={idx} />
          ))}
        </div>
      </Table.Cell>
      <Table.Cell className="h-px w-72 min-w-72 whitespace-normal">
        <span className="text-sm text-gray-500 dark:text-neutral-500">
          {review.review}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          <Badge status={getReviewStatus(review.status)}>
            {getReviewLabel(review.status)}
          </Badge>
        </span>
      </Table.Cell>
      <Table.Cell>
        {review.status === "APPEALED" || (review.rating ?? 0) === 5 ? null : (
          <Link
            className="inline-flex items-center gap-x-1 text-sm font-medium text-primary-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-primary-500"
            href={`/reviews/${review.id}/edit`}
          >
            Appeal
          </Link>
        )}
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Paper>
      <Table
        resourceName={resourceName}
        headings={headings}
        itemCount={reviews.length}
      >
        {rowsMarkup}
      </Table>
      <TablePagination hasNextPage={!!next} />
    </Paper>
  );
}
