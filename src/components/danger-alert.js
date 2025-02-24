export function DangerAlert({ children }) {
  return (
    <div
      className="mt-2 rounded-lg border border-red-200 bg-red-100 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-800/10 dark:text-red-500"
      role="alert"
      tabIndex={-1}
      aria-labelledby="hs-soft-color-danger-label"
    >
      {children}
    </div>
  );
}
