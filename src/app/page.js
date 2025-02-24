import { Button } from "@/components/button";
import { FadeUp } from "@/components/fade-up";
import { FillHalfStarIcon, FillStarIcon } from "@/icons";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const NoSSRToggleThemeButton = dynamic(
  () =>
    import("@/components/toggle-theme-button").then(
      (mod) => mod.ToggleThemeButton,
    ),
  {
    ssr: false,
  },
);

export default Page;

function Page() {
  return (
    <main className="absolute inset-0 grid place-items-center">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
          <div>
            <FadeUp delay={0.3} duration={0.6}>
              <h1 className="block text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl lg:text-6xl lg:leading-tight">
                Expand your reach with{" "}
                <span className="text-primary-600">DropCommerce</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.6} duration={0.6}>
              <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
                Empowering suppliers and stores with seamless connections to a
                global marketplace, designed for all scales of business.
              </p>
            </FadeUp>
            <FadeUp delay={1} duration={1}>
              <div className="mt-7 grid w-full gap-3 sm:inline-flex">
                <Button asChild className="px-4 py-3">
                  <Link href="auth/?mode=signup">Sign up</Link>
                </Button>
                <Button asChild className="px-4 py-3" variant="outline">
                  <Link href="auth/?mode=login">Sign in</Link>
                </Button>
              </div>
            </FadeUp>
            <div className="mt-6 grid grid-cols-2 gap-x-5 lg:mt-10">
              <div className="py-5">
                <div className="flex space-x-1">
                  <FillStarIcon />
                  <FillStarIcon />
                  <FillStarIcon />
                  <FillStarIcon />
                  <FillHalfStarIcon />
                </div>
                <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                  <span className="font-bold">4.6</span> /5 - from 404 reviews
                </p>
                <div className="mt-5">
                  <span className="text-lg font-semibold text-gray-800 hover:text-gray-600 dark:text-neutral-200 dark:hover:text-neutral-400">
                    Shopify
                  </span>
                </div>
              </div>
              <div className="py-5">
                <div className="flex space-x-1">
                  <FillStarIcon />
                  <FillStarIcon />
                  <FillStarIcon />
                  <FillStarIcon />
                </div>
                <p className="mt-3 text-sm text-gray-800 dark:text-neutral-200">
                  <span className="font-bold">4.1</span> /5 - from 31 reviews
                </p>
                <div className="mt-5">
                  <span className="text-lg font-semibold text-gray-800 hover:text-gray-600 dark:text-neutral-200 dark:hover:text-neutral-400">
                    Wix
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative ms-4 h-full w-full">
            <div className="absolute right-4 top-4 z-50 hidden md:block">
              <NoSSRToggleThemeButton />
            </div>
            <Image
              alt="Colleagues sharing insights and ideas, harnessing technology to drive innovation and collaboration in the office."
              src="https://dc-imports.s3.ca-central-1.amazonaws.com/signup-office.jpg"
              // placeholder="blur"
              quality={100}
              fill
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full rounded-md object-cover"
              priority
            />
            <div className="absolute inset-0 -z-[1] -mb-4 -ms-4 me-4 mt-4 size-full rounded-md bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0 lg:-mb-6 lg:-ms-6 lg:me-6 lg:mt-6" />
            <div className="absolute bottom-0 start-0"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
