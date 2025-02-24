export function ErrorMessage({ error, id }) {
  if (!error) return null;

  // Check if error is an array
  const errors = Array.isArray(error) ? error : [error];

  return (
    <>
      {/* Screen reader announcement */}
      <p aria-live="polite" className="sr-only">
        {errors.join(", ")}
      </p>

      {/* Visible error messages */}
      {errors.map((err, index) => (
        <p
          key={`${id}-error-${index}`}
          className="mt-2 text-xs text-red-600"
          id={`${id}-error`}
        >
          {err}
        </p>
      ))}
    </>
  );
}
