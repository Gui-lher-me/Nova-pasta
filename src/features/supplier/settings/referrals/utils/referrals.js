import { capitalized } from "@/lib/utils";

export function getReferralStatus(status) {
  switch (status) {
    case "SENT": {
      return "success";
    }
    default: {
      console.log(`Unknown referral status: ${status}`);
    }
  }
}

export function getReferralLabel(status = "") {
  return capitalized(status.toLowerCase());
}
