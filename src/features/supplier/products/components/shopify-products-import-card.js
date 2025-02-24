"use client";

import { Button } from "@/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { ImportsIcon } from "@/icons";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { shopifyImport } from "../server/actions/products";

export function ShopifyProductsImportCard() {
  const [isPending, startTransition] = useTransition();

  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopify products import</CardTitle>
        <CardDescription>
          Import products from your Shopify store. This process may take a
          while, and we will notify you once it is complete.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={async () => {
            startTransition(async () => {
              const data = await shopifyImport();
              if (data?.message) {
                toast(data.message, {
                  type: data.error ? "error" : "info",
                });
                if (!data.error) {
                  setDismissed(true);
                }
              }
            });
          }}
          disabled={isPending}
          loading={isPending}
        >
          <ImportsIcon />
          Import
        </Button>
      </CardFooter>
    </Card>
  );
}
