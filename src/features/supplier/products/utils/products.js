export function getProductStatus(status) {
  switch (status) {
    case "out_of_stock": {
      return "error";
    }
    case "low_stock": {
      return "warning";
    }
    case "partial_stock": {
      return "loading";
    }
    case "active": {
      return "success";
    }
    case "inactive": {
      return "disabled";
    }
    default: {
      console.log(`Unknown product status: ${status}`);
    }
  }
}

export function getProductLabel(status = "") {
  return formatStatus(status);
}

function formatStatus(status = "") {
  const [firstWord, ...rest] = status.split("_"); // Split the string into an array of words
  return [firstWord.charAt(0).toUpperCase() + firstWord.slice(1), ...rest].join(
    " ",
  );
}

export function transformErrors(errors, data) {
  const formattedErrors = {};

  errors.forEach((error) => {
    const { path, message } = error;
    // console.log(
    //   `Processing error for path: ${path.join(".")}, message: ${message}`,
    // );

    if (path[0] === "variants" && typeof path[1] === "number") {
      // Error is for a variant
      const variantIndex = path[1];
      const fieldName = path[2];

      const variantId = data.variants[variantIndex]?.id;

      if (!formattedErrors.variants) {
        formattedErrors.variants = {};
      }

      if (!formattedErrors.variants[variantId]) {
        formattedErrors.variants[variantId] = {};
      }

      if (!formattedErrors.variants[variantId][fieldName]) {
        formattedErrors.variants[variantId][fieldName] = [];
      }

      formattedErrors.variants[variantId][fieldName].push(message);
    } else {
      // Error is for a product-level field
      const fieldName = path[0];

      if (!formattedErrors[fieldName]) {
        formattedErrors[fieldName] = [];
      }

      formattedErrors[fieldName].push(message);
    }
  });

  return formattedErrors;
}
