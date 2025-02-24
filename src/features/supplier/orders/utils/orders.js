import { capitalized } from "@/lib/utils";

export function getOrderStatus(status) {
  switch (status) {
    case "paid": {
      return "loading";
    }
    case "shipped": {
      return "success";
    }
    case "cancelled": {
      return "disabled";
    }
    default: {
      console.log(`Unknown order status: ${status}`);
    }
  }
}

export function getOrderLabel(status = "") {
  return capitalized(status);
}
