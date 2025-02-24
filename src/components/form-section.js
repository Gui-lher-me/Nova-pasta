export function FormSection({
  title,
  shortDescription,
  description,
  children,
}) {
  return (
    <fieldset className="grid gap-2 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0 dark:border-neutral-700 dark:first:border-transparent sm:grid-cols-12 sm:gap-4">
      <legend className="sr-only">{title}</legend>
      <div className="sm:col-span-12">
        {title && (
          <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
            {title}
          </h2>
        )}
        {shortDescription && (
          <p className="mt-1.5 text-sm text-gray-600 dark:text-neutral-400">
            {shortDescription}
          </p>
        )}
        {description && (
          <p className="mt-1.5 text-sm text-gray-600 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
      {children}
    </fieldset>
  );
}
