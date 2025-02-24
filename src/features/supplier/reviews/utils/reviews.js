import { capitalized } from "@/lib/utils";

export function getReviewStatus(status) {
  switch (status) {
    case "APPEALED": {
      return "success";
    }
    case "ACTIVE": {
      return "warning";
    }
    default: {
      console.log(`Unknown review status: ${status}`);
    }
  }
}

export function getReviewLabel(status = "") {
  return capitalized(status.toLowerCase());
}
