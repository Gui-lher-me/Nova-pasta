import { AuthForm } from "@/features/auth/components/auth-form";
import Image from "next/image";
import Link from "next/link";

export default Page;

function Page({ searchParams }) {
  const formMode = searchParams.mode ?? "login";

  const isLoginPage = formMode === "login";

  const description = isLoginPage
    ? "Don't have an account yet?"
    : "Already registered?";

  const label = isLoginPage ? "Sign up" : "Sign in",
    href = isLoginPage ? "/auth/?mode=signup" : "/auth/?mode=login";

  return (
    <>
      <div className="flex flex-col p-6 pt-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="The DropCommerce logo"
            src="/assets/dropcommerce-icon-white.png"
            className="mx-auto object-cover"
            width={52.5}
            height={48}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary-500">
            DropCommerce
          </h2>
          {description && (
            <p className="max-w mt-2 text-center text-sm text-gray-600 dark:text-neutral-400">
              {description}{" "}
              <Link
                className="font-medium text-primary-500 decoration-2 hover:underline"
                href={href}
              >
                {label}
              </Link>
            </p>
          )}
          {!isLoginPage && (
            <p className="max-w mt-2 text-center text-sm text-gray-600 dark:text-neutral-400">
              Product supplier?{" "}
              <Link
                className="font-medium text-primary-500 decoration-2 hover:underline"
                href="/signup"
              >
                Sign up here
              </Link>
            </p>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <div className="relative mb-5 rounded-xl bg-white p-4 shadow dark:bg-neutral-900 sm:p-7">
          <AuthForm key={formMode} formMode={formMode} />
        </div>
      </div>
    </>
  );
}
