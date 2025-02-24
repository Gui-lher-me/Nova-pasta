"use client";

import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { UploadIcon } from "@/icons";
import { useRef, useTransition } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "../server/actions/products";
import { ImagesGrid } from "./images-grid";

export function ImagesCard({ id, images }) {
  const [isPending, startTransition] = useTransition();

  const inputRef = useRef(null);

  const handlePickClick = () => {
    inputRef.current.click();
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the selected image file (e.g., upload or display)
      const formData = new FormData();
      formData.set("product_image", file);

      startTransition(async () => {
        const data = await uploadImage(id, formData);
        if (data?.message) {
          toast(data.message, {
            type: data.error ? "error" : "success",
          });
        }
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product images</CardTitle>
        <CardDescription>
          Upload and manage product images to enhance visibility and showcase
          details in the marketplace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImagesGrid id={id} images={images} />
      </CardContent>
      <CardFooter justifyEnd>
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleUpload}
          aria-describedby="product_image-error"
        />
        <Button
          onClick={handlePickClick}
          disabled={isPending}
          loading={isPending}
          variant="outline"
        >
          <UploadIcon />
          Upload image
        </Button>
      </CardFooter>
    </Card>
  );
}
