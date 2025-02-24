"use client";

import { Button } from "@/components/button";
import { managePrebuilt } from "@/features/admin/prebuilts/server/actions/prebuilts";
import { Check } from "lucide-react";
import { useTransition } from "react";
import { toast } from "react-toastify";

export function ActionButton({ id, action, value }) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant="outline"
      onClick={async () => {
        startTransition(async () => {
          const data = await managePrebuilt(id, action, true);
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
      {value && <Check className="h-5 w-5" />}
      {action.charAt(0).toUpperCase() + action.slice(1).replace(/_/g, " ")}
    </Button>
  );
}
