"use server";
import "server-only";

import { catchError } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { exportOrders as exportOrdersDb } from "../db/orders";

export const exportOrders = async (orders) => {
  const [error, data] = await catchError(exportOrdersDb(orders));

  if (error) {
    return { error: true, message: error.message, url: data?.url };
  } else {
    revalidateTag("store-orders");
    return { error: false, message: "Orders exported successfully" };
  }
};
