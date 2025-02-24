import { capitalized } from "@/lib/utils";

export function getVendorStatus(status) {
  switch (status) {
    case "PENDING": {
      return "warning";
    }
    case "APPROVED": {
      return "success";
    }
    case "DENIED": {
      return "error";
    }
    case "CANCELLED": {
      return "disabled";
    }
    default: {
      console.log(`Unknown vendor status: ${status}`);
    }
  }
}

export function getVendorLabel(status = "") {
  return capitalized(status.toLowerCase());
}
