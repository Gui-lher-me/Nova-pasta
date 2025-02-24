export function ErrorFallbackPage({ error }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <main>
      <div className="mx-auto my-4 max-w-[85rem] px-4 sm:my-10 sm:px-6 lg:px-8">
        <div
          role="alert"
          className="border-l-4 border-red-500 bg-red-100 p-4 text-red-700"
        >
          <h1 className="font-bold">Oops, looks like something went wrong!</h1>
          <p>
            {isDev
              ? error.name + ":"
              : "We're having trouble processing your request. Please try again later."}
          </p>
          <p className="mt-2">
            {isDev
              ? error.message
              : "If the problem persists, please contact support@dropcommerce.com for support."}
          </p>
          {/* Include this for developers or for logging purposes */}
          <pre className="hidden">{error.message}</pre>
        </div>
      </div>
    </main>
  );
}
