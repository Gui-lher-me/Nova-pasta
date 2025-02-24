"use client";

import { Spinner } from "@/components/spinner";
import { notFoundImageUrl } from "@/constants";
import { AmericanFlag, CanadianFlag } from "@/icons";
import { roundToNearestHalf } from "@/lib/utils";
import { Heart, Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { markAsFavorite, markAsUnfavorite } from "../server/actions/suppliers";

export function SupplierItem({ supplier, storeId }) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isPending, startTransition] = useTransition();

  const [imageSrc, setImageSrc] = useState(
    supplier.image ? supplier.image : notFoundImageUrl,
  );

  const handleMarkAsUnfavorite = () => {
    startDeleteTransition(async () => {
      const data = await markAsUnfavorite({ supplier: supplier.id });
      if (data.message) {
        toast(data.message, {
          type: data.error ? "error" : "success",
        });
      }
    });
  };

  const handleMarkAsFavorite = () => {
    startTransition(async () => {
      const data = await markAsFavorite({
        store: storeId,
        supplier: supplier.id,
      });
      if (data.message) {
        toast(data.message, {
          type: data.error ? "error" : "success",
        });
      }
    });
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow dark:bg-neutral-900">
      <Link href={`/store/${storeId}/suppliers/${supplier.id}/details`}>
        <div className="relative">
          <div className="relative h-48">
            <Image
              fill
              src={imageSrc}
              sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
              alt={supplier.name}
              className="h-full w-full object-cover"
              onError={() => {
                setImageSrc(notFoundImageUrl);
              }}
            />
          </div>
          <div className="absolute bottom-2 left-2 flex items-center rounded-full bg-white px-2 py-1 text-xs font-semibold dark:bg-neutral-900">
            {supplier.country === "United States" ? (
              <AmericanFlag />
            ) : (
              <CanadianFlag />
            )}
            <span>{supplier.country === "United States" ? "US" : "CA"}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-1 truncate text-lg font-semibold">
            {supplier.name}
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            {(supplier.city !== "" ? supplier.city + ", " : "") +
              supplier.country}
          </p>
          {supplier.rating !== undefined &&
            supplier.reviewCount !== undefined && (
              <div className="mb-2 flex items-center">
                {[...Array(5)].map((_, i) => {
                  const starIndex = i + 1; // 1-based index for stars
                  if (starIndex <= roundToNearestHalf(supplier.rating)) {
                    return (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-current text-yellow-400"
                      />
                    );
                  } else if (
                    starIndex ===
                    roundToNearestHalf(supplier.rating) + 0.5
                  ) {
                    return (
                      <StarHalf
                        key={i}
                        className="h-4 w-4 fill-current text-yellow-400"
                      />
                    );
                  }
                })}
                <span className="ml-2 text-sm text-gray-600">
                  ({supplier.reviewCount})
                </span>
              </div>
            )}
        </div>
      </Link>
      {supplier.favorite ? (
        <button
          className="absolute right-2 top-2 rounded-full bg-white p-1 text-gray-600"
          aria-label="Unfavorite"
          onClick={handleMarkAsUnfavorite}
        >
          {isDeletePending ? (
            <Spinner />
          ) : (
            <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
          )}
        </button>
      ) : (
        <button
          className="absolute right-2 top-2 rounded-full bg-white p-1 text-gray-600"
          aria-label="Favorite"
          onClick={handleMarkAsFavorite}
        >
          {isPending ? <Spinner /> : <Heart className="h-5 w-5" />}
        </button>
      )}
    </div>
  );
}
