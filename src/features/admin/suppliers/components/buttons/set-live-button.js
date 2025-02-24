"use client";

import { Button } from "@/components/button";
import { CheckCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { manageSupplier } from "../../server/actions/suppliers";

export function SetLiveButton({ id }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={async () => {
        startTransition(async () => {
          const data = await manageSupplier(id, "set_live");
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
      <CheckCircle className="h-5 w-5" />
      Set live
    </Button>
  );
}
