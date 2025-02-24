import { cn } from "@/lib/utils";
import Image from "next/image";
import { DeleteImageButton } from "./buttons/delete-image-button";
import { MainImageButton } from "./buttons/main-image-button";

export function ImagesGrid({ id, images }) {
  if (images.length === 0)
    return (
      <p className="flex max-h-[250px] min-h-[150px] items-center justify-center text-muted-foreground">
        No images available
      </p>
    );
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {images.map((image) => (
        <div
          key={image.id}
          className={cn(
            "relative h-[11rem] overflow-hidden rounded-lg ring-2",
            image.feature ? "ring-primary-500" : "ring-transparent",
          )}
        >
          <div className="absolute left-0 top-0 z-40 h-full w-full bg-[#00000080] opacity-0 hover:opacity-100">
            <div className="absolute right-1 top-1 flex gap-1">
              {!image.feature && (
                <MainImageButton
                  productId={id}
                  imageId={image.id}
                  images={images}
                />
              )}
              {images.length > 1 && <DeleteImageButton id={image.id} />}
            </div>
          </div>
          <Image
            className="object-cover"
            src={image.url}
            alt={image.id}
            fill
            sizes="(min-width: 768px) 25%, 50%"
          />
        </div>
      ))}
    </div>
  );
}
