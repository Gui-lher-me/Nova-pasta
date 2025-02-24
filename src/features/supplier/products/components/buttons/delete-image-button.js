"use client";

import { Spinner } from "@/components/spinner";
import { TrashIcon } from "@/icons";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { deleteImage } from "../../server/actions/products";

export function DeleteImageButton({ id }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={async () => {
        startTransition(async () => {
          const data = await deleteImage(id);
          if (data?.message) {
            toast(data.message, {
              type: data.error ? "error" : "success",
            });
          }
        });
      }}
      className="cursor-pointer rounded-lg bg-white p-1"
      disabled={isPending}
    >
      {isPending ? (
        <Spinner className="text-red-500 dark:text-red-500" />
      ) : (
        <TrashIcon />
      )}
      <span className="sr-only">Delete image</span>
    </button>
  );
}
