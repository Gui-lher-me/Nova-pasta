"use client";

import { ErrorFallbackPage } from "@/components/error-fallback-page";
import { useEffect } from "react";

export default function Error({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorFallbackPage error={error} />;
}
