"use server";
import "server-only";

import { uploadImage as uploadImageDb } from "@/lib/cloudinary";
import { isImageFile } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  productSchema,
  titleSchema,
  variantSchema,
  variantsSchema,
} from "../../schemas/products";
import { transformErrors } from "../../utils/products";

const baseUrl = process.env.CORE_API_URL;

export const deleteImage = async (id) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/image_delete/", baseUrl);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const formData = new FormData();
    formData.set("image_id", id);

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to delete image");
    }

    const res = await rawResponse.json();

    console.log({ res });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while deleting image",
    };
  }

  revalidateTag("supplier-product");
};

export const uploadImage = async (productId, formData) => {
  const data = Object.fromEntries(formData);

  const file = data.product_image;

  if (!isImageFile(file)) {
    return { error: true, message: "Please enter a valid image file" };
  }

  let imageUrl = null;

  // upload to cloudinary
  try {
    const url = await uploadImageDb(file);
    imageUrl = url;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message:
        error.message ?? "An unexpected error occurred while uploading image",
    };
  }

  // save in db
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/image_upload/", baseUrl);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const formData = new FormData();
    formData.set("product_id", productId);
    formData.set("url", imageUrl);

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to upload image");
    }

    const res = await rawResponse.json();

    console.log({ res });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while saving image",
    };
  }

  revalidateTag("supplier-product");
};

export const toggleStatus = async (active, id) => {
  try {
    await updateProduct({ active, id });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while saving product status",
    };
  }

  revalidateTag("supplier-product");
  return { error: false, message: "Saved successfully" };
};

export const newProduct = async (_, formData) => {
  const title = formData.get("title");
  const parsed = titleSchema.safeParse({ title });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  let productId = null;

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/new_product/", baseUrl);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ title: parsed.data.title }),
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to create new product");
    }

    const res = await rawResponse.json();

    console.log({ res });

    productId = res.product_id;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while creating new product",
    };
  }

  redirect(`/products/${productId}/edit`);
};

export const mainImage = async (productId, images) => {
  const data = {
    id: productId,
    images,
  };

  try {
    await updateProduct(data);
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while setting image as main",
    };
  }

  revalidateTag("supplier-product");
  return {
    error: false,
    message: "The new main image has been set successfully",
  };
};

async function updateProduct(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  const url = new URL("/create_product/", baseUrl);

  const headers = new Headers();
  headers.set("Authorization", `Token ${token}`);
  headers.set("Content-Type", "application/json");

  const rawResponse = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!rawResponse.ok) {
    throw new Error("Failed to save product changes");
  }

  const res = await rawResponse.json();

  console.log({ res });
}

export const shopifyImport = async () => {
  try {
    // const cookieStore = cookies();
    // const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/supplier_import", baseUrl);

    // const headers = new Headers();
    // headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      method: "POST",
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to import Shopify products");
    }

    const res = await rawResponse.json();

    console.log({ res });

    return {
      error: false,
      message: "We'll let you know when we're done importing your products",
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while importing products",
    };
  }
};

export const newVariant = async (productId, _, formData) => {
  const data = Object.fromEntries(formData);

  const parsed = variantSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  const { retailPrice, ...rest } = parsed.data;

  const updatedProduct = {
    id: productId,
    variants: [{ ...rest, retail_price: retailPrice }],
  };

  try {
    await updateProduct(updatedProduct);
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while creating new variant",
    };
  }

  revalidateTag("supplier-product");
  redirect(`/products/${productId}/edit`);
};

export const saveVariants = async (id, _, formData) => {
  const data = Object.fromEntries(formData);

  // Build the variants object from the data
  const variants = Object.keys(data)
    .filter((key) => key.startsWith("variant_"))
    .reduce((acc, key) => {
      let [, id, field] = key.match(/^variant_(.*)_(.*)$/);
      id = +id;
      if (!acc[id]) acc[id] = { id };

      // Convert specific fields to numbers if necessary
      if (["price", "quantity", "retailPrice"].includes(field)) {
        acc[id][field] = data[key] !== "" ? Number(data[key]) : ""; // handle empty strings
      } else {
        acc[id][field] = data[key];
      }
      return acc;
    }, {});

  // Convert the object to an array of variant objects
  const variantsArray = Object.values(variants).map(
    ({ status, ...variant }) => ({
      ...variant,
      active: status === "active",
    }),
  );

  const product = {
    variants: variantsArray,
  };

  // Parse the data using the schema
  const parsed = variantsSchema.safeParse(product);

  // Check for product schema errors
  if (!parsed.success) {
    const errors = transformErrors(parsed.error.errors, product);

    return {
      errors,
    };
  }

  const updatedProduct = {
    id,
    variants: parsed.data.variants.map(({ retailPrice, ...variant }) => ({
      ...variant,
      retail_price: retailPrice,
    })),
  };

  try {
    await updateProduct(updatedProduct);
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while saving changes",
    };
  }

  // revalidateTag("supplier-product");
  return { error: false, message: "Saved successfully" };
};

export const saveProduct = async (id, _, formData) => {
  const product = {
    id,
    title: formData.get("title"),
    description: formData.get("description"),
    sku: formData.get("sku"),
    featured: formData.has("featured"), // probably a server error
    track_inventory: formData.has("track_inventory"),
    track_pricing: formData.has("track_pricing"),
    override_discount_percent: formData.has("override_discount_percent"),
    discount_percent: Number(formData.get("discount_percent")),
  };

  // Parse the data using the schema
  const parsed = productSchema.safeParse(product);

  // Check for product schema errors
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  try {
    await updateProduct(parsed.data);
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while saving changes",
    };
  }

  revalidateTag("supplier-product");
  return { error: false, message: "Saved successfully" };
};
