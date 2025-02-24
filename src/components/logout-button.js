import { LogoutIcon } from "@/icons";
import { useTransition } from "react";

export function LogoutButton({ logout, children }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={async () => {
        startTransition(() => {
          logout?.();
        });
      }}
      disabled={isPending}
      className="flex w-full items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
    >
      <LogoutIcon />
      {isPending ? "Please wait..." : children}
    </button>
  );
}
