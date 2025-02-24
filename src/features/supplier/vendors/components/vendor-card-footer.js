"use client";

import { Button } from "@/components/button";
import { CardFooter } from "@/components/card";
import { Toast } from "@/components/toast";
import { ThumbsDownIcon, ThumbsUpIcon } from "@/icons";
import { useTransition } from "react";
import { useFormState } from "react-dom";
import { vendor } from "../server/actions/vendors";

export function VendorCardFooter({ id, status }) {
  const approveButtonMarkup = (
    <ServerActionButton action={vendor.bind(null, id, "approve")}>
      <ThumbsUpIcon />
      Approve access
    </ServerActionButton>
  );

  const denyButtonMarkup = (
    <ServerActionButton
      action={vendor.bind(null, id, "deny")}
      variant="outline"
    >
      <ThumbsDownIcon />
      Deny access
    </ServerActionButton>
  );

  const revokeButtonMarkup = (
    <ServerActionButton action={vendor.bind(null, id, "deny")}>
      <ThumbsDownIcon />
      Revoke access
    </ServerActionButton>
  );

  let buttons;

  switch (status) {
    case "PENDING":
      buttons = (
        <>
          {denyButtonMarkup}
          {approveButtonMarkup}
        </>
      );
      break;
    case "APPROVED":
      buttons = revokeButtonMarkup;
      break;
    case "DENIED":
      buttons = approveButtonMarkup;
      break;
    default:
      buttons = null;
  }

  return (
    <CardFooter justifyEnd>
      <div className="inline-flex gap-x-2">{buttons}</div>
    </CardFooter>
  );
}

function ServerActionButton({ action, children, ...rest }) {
  const [isPending, startTransition] = useTransition();

  const [state, wrappedAction] = useFormState(action, undefined);

  return (
    <>
      <Toast message={state?.message} error={state?.error} />
      <Button
        onClick={async () => {
          startTransition(() => {
            wrappedAction();
          });
        }}
        loading={isPending}
        {...rest}
      >
        {children}
      </Button>
    </>
  );
}
