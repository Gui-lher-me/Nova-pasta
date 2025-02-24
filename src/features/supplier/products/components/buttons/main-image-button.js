"use client";

import { Spinner } from "@/components/spinner";
import { StarIcon } from "@/icons";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { mainImage } from "../../server/actions/products";

export function MainImageButton({ productId, imageId, images }) {
  const [isPending, startTransition] = useTransition();

  const newImages = images.map((image) => ({
    ...image,
    feature: image.id === imageId,
  }));

  return (
    <button
      onClick={async () => {
        startTransition(async () => {
          const data = await mainImage(productId, newImages);
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
        <Spinner className="text-white dark:text-black" />
      ) : (
        <StarIcon />
      )}
      <span className="sr-only">Set as main image</span>
    </button>
  );
}
