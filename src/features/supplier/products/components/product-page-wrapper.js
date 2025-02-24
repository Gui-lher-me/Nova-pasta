"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { CheckCircle, XCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { toggleStatus } from "../server/actions/products";

export function ProductPageWrapper({ id, isActive, children }) {
  const [isPending, startTransition] = useTransition();

  return (
    <PageWrapper
      narrowWidth
      title="Product details"
      subtitle="Manage product information, images, variants, and custom shipping rates."
      secondaryActions={[
        {
          content: isActive ? (
            <>
              <XCircle className="h-5 w-5" />
              Deactivate
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5" />
              Activate
            </>
          ),
          onAction: async () => {
            startTransition(async () => {
              const data = await toggleStatus(!isActive, id);
              if (data?.message) {
                toast(data.message, {
                  type: data.error ? "error" : "success",
                });
              }
            });
          },
          loading: isPending,
          variant: isActive ? "destructive" : "outline",
        },
      ]}
    >
      {children}
    </PageWrapper>
  );
}
