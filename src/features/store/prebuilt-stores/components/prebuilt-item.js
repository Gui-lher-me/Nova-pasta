"use client";

import { Badge } from "@/components/badge";
import { notFoundImageUrl } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function PrebuiltItem({ item, storeId }) {
  const [imageSrc, setImageSrc] = useState(
    item.image ? item.image : notFoundImageUrl,
  );

  return (
    <Link href={`/store/${storeId}/prebuilt-stores/${item.id}/details`}>
      <div className="relative overflow-hidden rounded-lg bg-white shadow dark:bg-neutral-900">
        <div className="relative h-48">
          <Image
            fill
            src={imageSrc}
            sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
            alt={item.name}
            className="h-full w-full object-cover"
            onError={() => {
              setImageSrc(notFoundImageUrl);
            }}
          />
        </div>
        {item.premium && (
          <div className="absolute right-4 top-4 z-10">
            <Badge status="success">PREMIUM</Badge>
          </div>
        )}
        <div className="p-4">
          <h3 className="mb-1 truncate text-lg font-semibold">{item.name}</h3>
          <div className="mt-3 flex flex-col">
            <span className="text-xl font-bold text-primary-600">
              ${item.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
