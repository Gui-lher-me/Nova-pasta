"use server";
import "server-only";

import { catchError } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import {
  deleteProducts as deleteProductsDb,
  pushProducts as pushProductsDb,
  saveProduct as saveProductDb,
} from "../db/imports";

export const deleteProducts = async (products) => {
  const [error] = await catchError(deleteProductsDb(products));

  if (error) {
    return { error: true, message: error.message };
  } else {
    revalidateTag("store-imports");
    return { error: false, message: "Products deleted successfully" };
  }
};

export const pushProducts = async (products) => {
  const [error] = await catchError(pushProductsDb(products));

  if (error) {
    return { error: true, message: error.message };
  } else {
    revalidateTag("store-imports");
    return { error: false, message: "Products pushed successfully" };
  }
};

export const saveProduct = async (product) => {
  const [error] = await catchError(saveProductDb(product));

  if (error) {
    return { error: true, message: error.message };
  } else {
    return { error: false, message: "Product pushed successfully" };
  }
};
