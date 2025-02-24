"use client";

import { Button } from "@/components/button";
import { Check } from "lucide-react";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { manageSupplier } from "../../server/actions/suppliers";

export function ApproveButton({ id }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        startTransition(async () => {
          const data = await manageSupplier(id, "initial_approval");
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
      <Check className="h-5 w-5" />
      Approve
    </Button>
  );
}
