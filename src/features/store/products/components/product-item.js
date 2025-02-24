"use client";

import { Button } from "@/components/button";
import { notFoundImageUrl } from "@/constants";
import { average, formattedCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { importProduct } from "../server/actions/products";

export function ProductItem({ product, storeId }) {
  const [isPending, startTransition] = useTransition();

  const [imageSrc, setImageSrc] = useState(
    product.image ? product.image : notFoundImageUrl,
  );

  const handleImport = () => {
    startTransition(async () => {
      const data = await importProduct({ product_id: product.id });
      if (data.message) {
        toast(data.message, {
          type: data.error ? "error" : "success",
        });
      }
    });
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow dark:bg-neutral-900">
      <Link href={`/store/${storeId}/products/${product.id}/details`}>
        <div className="relative h-48">
          <Image
            fill
            src={imageSrc}
            sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
            alt={product.title}
            className="h-full w-full object-cover"
            onError={() => {
              setImageSrc(notFoundImageUrl);
            }}
            priority
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="mb-1 truncate text-lg font-semibold">{product.title}</h3>
        <p className="mb-2 text-sm text-gray-600">
          <Link
            href={`/store/${storeId}/suppliers/${product.supplier.id}/details`}
          >
            by {product.supplier.name}
          </Link>
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold">
            {formattedCurrency.format(
              average(product.lowestPrice, product.highestPrice),
            )}
          </span>
        </div>
        <div className="mt-4">
          <Button
            loading={isPending}
            onClick={handleImport}
            fullWidth
            disabled={product.imported || isPending}
          >
            {!product.imported ? "Add to import list" : "Added to import list"}
          </Button>
        </div>
      </div>
    </div>
  );
}
