import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./button";

export function PageWrapper({
  backAction,
  narrowWidth,
  title,
  titleMetadata,
  subtitle,
  primaryAction,
  secondaryActions,
  children,
  className,
}) {
  const PrimaryActionIcon = primaryAction?.icon;

  return (
    <main>
      <div
        className={cn(
          "mx-auto p-4 pb-10 sm:p-6 lg:p-8 lg:pb-14",
          narrowWidth ? "max-w-5xl" : "max-w-[1200px]",
          className,
        )}
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-y-2 sm:flex-nowrap">
          <div>
            {backAction}
            {title && (
              <h1 className="text-xl font-semibold sm:text-2xl">
                {title} {titleMetadata && titleMetadata}
              </h1>
            )}
            {subtitle && <p className="text-balance text-xs">{subtitle}</p>}
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {secondaryActions?.map((secondaryAction) => {
              const SecondaryActionIcon = secondaryAction.icon;

              return (
                <Button
                  key={secondaryAction.content}
                  onClick={secondaryAction.onAction}
                  disabled={secondaryAction.disabled}
                  loading={secondaryAction.loading}
                  variant={secondaryAction.variant}
                >
                  {secondaryAction.icon && <SecondaryActionIcon />}
                  {secondaryAction.content}
                </Button>
              );
            })}
            {primaryAction && (
              <Button asChild>
                <Link href={primaryAction.url}>
                  {primaryAction?.icon && <PrimaryActionIcon />}
                  {primaryAction.content}
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="space-y-4 sm:space-y-6">{children}</div>
      </div>
    </main>
  );
}
