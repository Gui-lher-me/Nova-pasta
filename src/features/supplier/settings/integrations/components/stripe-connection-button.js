"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import { stripe } from "../server/actions/integrations";
import { IntegrationCardButton } from "./integration-card";

export function StripeConnectionButton({ supplierId, mode, children }) {
  const [isPending, startTransition] = useTransition();

  return (
    <IntegrationCardButton
      onClick={async () => {
        startTransition(async () => {
          const data = await stripe(supplierId, mode);
          if (data?.message) {
            toast(data.message, {
              type: data.error ? "error" : "success",
            });
          }
        });
      }}
    >
      {isPending ? "Please wait..." : children}
    </IntegrationCardButton>
  );
}
