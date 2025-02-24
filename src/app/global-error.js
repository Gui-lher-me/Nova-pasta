"use client";

import { useEffect } from "react";

export default function GlobalError({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          role="alert"
          className="border-l-4 border-red-500 bg-red-100 p-4 text-red-700"
        >
          <h1 className="font-bold">Oops, looks like something went wrong!</h1>
          <p>
            {process.env.NODE_ENV === "development"
              ? error.name + ":"
              : "We're having trouble processing your request. Please try again later."}
          </p>
          <p className="mt-2">
            {process.env.NODE_ENV === "development"
              ? error.message
              : "If the problem persists, please contact support@dropcommerce.com for support."}
          </p>
          {/* Include this for developers or for logging purposes */}
          <pre className="hidden">{error.message}</pre>
        </div>
      </body>
    </html>
  );
}
