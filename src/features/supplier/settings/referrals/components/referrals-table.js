import { Badge } from "@/components/badge";
import { Paper } from "@/components/paper";
import { Table } from "@/components/table";
import { getReferralLabel, getReferralStatus } from "../utils/referrals";

export function ReferralsTable({ data }) {
  const { referrals } = data;

  const headings = ["Name", "Type", "Email", "Status"];

  const resourceName = {
    singular: "referral",
    plural: "referrals",
  };

  const rowsMarkup = referrals.map((referral) => (
    <Table.Row key={referral.id}>
      <Table.Cell>
        <span className="block max-w-44 truncate text-sm text-gray-600 dark:text-neutral-400">
          {referral.recipient_name}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {referral.recipient_type}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          {referral.recipient_email}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-gray-600 dark:text-neutral-400">
          <Badge status={getReferralStatus(referral.status)}>
            {getReferralLabel(referral.status)}
          </Badge>
        </span>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Paper>
      <Table
        resourceName={resourceName}
        headings={headings}
        itemCount={referrals.length}
      >
        {rowsMarkup}
      </Table>
    </Paper>
  );
}
