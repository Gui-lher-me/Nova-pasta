import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function humanize(str) {
  let frags = str
    .split("_")
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase(),
    );
  return frags.join(" ");
}

export const getSupplierWarnings = (settings) => {
  let profileSettingsWarning = [
    settings.return_policy,
    settings.short_description,
    settings.description,
    settings.logo,
  ].includes("");

  let valuesWarning =
    ![
      settings.made_in_us,
      settings.made_in_canada,
      settings.fair_trade,
      settings.organic,
      settings.handmade,
      settings.kosher,
      settings.non_gmo,
      settings.women_owned,
      settings.vegan,
      settings.eco_friendly,
      settings.social_good,
      settings.small_batch,
    ].includes(true) && !settings.no_values;

  return {
    active_shipping_options: !settings.active_shipping_options,
    values: valuesWarning,
    profile_settings: profileSettingsWarning,
    branding_description: settings.branding_description === "",
    payment: !settings.stripe_id_saved && !settings.merchant_id,
    supplier_agreement: !settings.supplier_agreement,
  };
};

export const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

export const catchError = (promise) =>
  promise.then((data) => [undefined, data]).catch((error) => [error]);

export const withValidation = (schema, fn) => {
  return async (data) => {
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      return {
        error: true,
        message:
          "The entered data is not valid. Please review your input and try again.",
      };
    }

    return await fn(parsed.data); // Pass all arguments to the wrapped function
  };
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export class DropCommerceError extends Error {
  constructor(message, status) {
    super(message); // Pass the message to the parent Error class
    this.status = status; // Add the status property
    this.name = this.constructor.name; // Set the name property to the name of the custom error class
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace
  }
}

export class FileDownloader {
  constructor(url) {
    this.url = url;
  }

  createDownloadLink() {
    const link = document.createElement("a");
    link.href = this.url;
    return link;
  }

  appendLinkToDOM(link) {
    document.body.appendChild(link);
  }

  downloadFile() {
    const link = this.createDownloadLink();
    this.appendLinkToDOM(link);
    link.click();
    document.body.removeChild(link); // Clean up the DOM after the download
  }
}

export const generateRandomString = (length) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const formattedCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formattedDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export const formattedTime = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  // second: "numeric",
  hour12: true,
});

export const capitalized = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export function getSupplierStatus(status) {
  switch (status) {
    case "PENDING": {
      return "warning";
    }
    case "ONBOARDING": {
      return "loading";
    }
    case "HIDDEN": {
      return "disabled";
    }
    case "NO_PLATFORM": {
      return "warning";
    }
    case "NO_PAYMENT_METHOD": {
      return "warning";
    }
    case "ON_HOLIDAYS": {
      return "disabled";
    }
    case "LOW_SCORE": {
      return "warning";
    }
    case "REJECTED": {
      return "error";
    }
    case "REMOVED": {
      return "error";
    }
    case "PRIVATE": {
      return "disabled";
    }
    case "ACTIVE": {
      return "success";
    }
    default: {
      console.log(`Unknown supplier status: ${status}`);
    }
  }
}

export function getSupplierLabel(status) {
  switch (status) {
    case "PENDING": {
      return "Pending";
    }
    case "ONBOARDING": {
      return "Onboarding";
    }
    case "HIDDEN": {
      return "Hidden";
    }
    case "NO_PLATFORM": {
      return "No platform";
    }
    case "NO_PAYMENT_METHOD": {
      return "No payment";
    }
    case "ON_HOLIDAYS": {
      return "On holidays";
    }
    case "LOW_SCORE": {
      return "Low score";
    }
    case "REJECTED": {
      return "Rejected";
    }
    case "REMOVED": {
      return "Removed";
    }
    case "PRIVATE": {
      return "Private";
    }
    case "ACTIVE": {
      return "Active";
    }
    default: {
      console.log(`Unknown supplier status: ${status}`);
    }
  }
}

export const average = (a, b) => (a + b) / 2;

export const roundToNearestHalf = (rating) => Math.round(rating * 2) / 2;

export function isImageFile(file) {
  return (
    file && typeof file.type === "string" && file.type.startsWith("image/")
  );
}

export function addHttpsIfNeeded(url) {
  // Check if the url starts with 'http://' or 'https://'
  if (!/^https?:\/\//i.test(url)) {
    // If not, prepend 'https://'
    return "https://" + url;
  }
  return url; // Otherwise, return the original url
}

function validateShopifyHostnameWithProtocol(hostname) {
  const regex = /^https?\:\/\/[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com\/?/;
  return regex.test(hostname);
}

function validateShopifyHostnameWithoutProtocol(hostname) {
  const regex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com/;
  return regex.test(hostname);
}

export function validateShopifyStoreURL(shopifyStoreURL) {
  return (
    validateShopifyHostnameWithProtocol(shopifyStoreURL) ||
    validateShopifyHostnameWithoutProtocol(shopifyStoreURL)
  );
}
