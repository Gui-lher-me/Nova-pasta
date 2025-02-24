import { SupplierSignupForm } from "@/features/signup/components/supplier-signup-form";
import Image from "next/image";
import Link from "next/link";

export default Page;

function Page() {
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
          <p className="max-w mt-2 text-center text-sm text-gray-600 dark:text-neutral-400">
            Already registered?{" "}
            <Link
              className="font-medium text-primary-500 decoration-2 hover:underline"
              href="/auth/?mode=login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <div className="relative mb-5 rounded-xl bg-white p-4 shadow dark:bg-neutral-900 sm:p-7">
          <SupplierSignupForm />
        </div>
      </div>
    </>
  );
}
