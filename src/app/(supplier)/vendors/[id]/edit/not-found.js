import { Button } from "@/components/button";
import { ArrowLeftIcon } from "@/icons";
import Link from "next/link";

export default function NotFound() {
  const title = "Oops, something went wrong.",
    description = "Sorry, we couldn't find your page.";

  return (
    <div className="mx-auto flex size-full max-w-[50rem] flex-col py-24">
      <div className="mb-auto flex w-full justify-center py-4">
        <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
          <span className="flex-none text-xl font-semibold dark:text-white sm:text-3xl">
            DropCommerce
          </span>
        </nav>
      </div>
      <main id="content">
        <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
          <h1 className="block text-7xl font-bold text-gray-800 dark:text-white sm:text-9xl">
            404
          </h1>
          <p className="mt-3 text-gray-600 dark:text-neutral-400">{title}</p>
          <p className="text-gray-600 dark:text-neutral-400">{description}</p>
          <Button className="mt-5" asChild>
            <Link href="..">
              <ArrowLeftIcon />
              Go back
            </Link>
          </Button>
        </div>
      </main>
      <footer className="mt-auto py-5 text-center">
        <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            © All Rights Reserved. {new Date().getFullYear()}.
          </p>
        </div>
      </footer>
    </div>
  );
}
