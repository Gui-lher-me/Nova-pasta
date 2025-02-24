"use client";

import { Button } from "@/components/button";
import { Check, Copy, UserCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { impersonate } from "../../server/actions/suppliers";

export function ImpersonateButton({ id }) {
  const [isPending, startTransition] = useTransition();

  const [link, setLink] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    if (link) {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
        setLink(null);
      }, 2000);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={
        !link
          ? async () => {
              startTransition(async () => {
                const data = await impersonate(id);
                if (data?.message) {
                  toast(data.message, {
                    type: data.error ? "error" : "success",
                  });
                }
                if (data?.link) {
                  setLink(data.link);
                }
              });
            }
          : handleCopyLink
      }
      disabled={isPending || isCopied}
      loading={isPending}
    >
      {isCopied ? (
        <>
          <Check className="mr-1 h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          {link ? (
            <>
              <Copy className="mr-1 h-4 w-4" />
              Copy Link
            </>
          ) : (
            <>
              <UserCircle className="h-5 w-5" />
              Impersonate
            </>
          )}
        </>
      )}
    </Button>
  );
}
