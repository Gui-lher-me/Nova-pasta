"use client";

import { Button } from "@/components/button";
import { XCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { manageSupplier } from "../../server/actions/suppliers";

export function DeactivateButton({ id }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      onClick={async () => {
        startTransition(async () => {
          const data = await manageSupplier(id, "rejected");
          if (data?.message) {
            toast(data.message, {
              type: data.error ? "error" : "success",
            });
          }
        });
      }}
      disabled={isPending}
      loading={isPending}
    >
      <XCircle className="h-5 w-5" />
      Reject
    </Button>
  );
}
