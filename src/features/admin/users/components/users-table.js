import { Paper } from "@/components/paper";
import { Table } from "@/components/table";
import { UsersTableToolbar } from "./users-table-toolbar";

export function UsersTable({ data }) {
  const { results: users } = data;

  const headings = ["User", "Store ID", "Platform"];

  const resourceName = {
    singular: "user",
    plural: "users",
  };

  const rowsMarkup = users.map((user) => (
    <Table.Row key={user.id}>
      <Table.Cell>
        <span className="block max-w-44 truncate text-sm text-gray-600 dark:text-neutral-400">
          {user.username}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {user.stores[0]}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {user.platforms[0] ?? " - "}
        </span>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Paper>
      <UsersTableToolbar />
      <Table
        resourceName={resourceName}
        headings={headings}
        itemCount={users.length}
      >
        {rowsMarkup}
      </Table>
    </Paper>
  );
}
