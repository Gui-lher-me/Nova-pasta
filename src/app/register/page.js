import { RegisterDistributorForm } from "@/features/register/components/register-distributor-form";
import Image from "next/image";

export default Page;

function Page() {
  return (
    <>
      <div className="flex flex-col p-6 pt-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Powered By People"
            src="https://dropcommerce-images.s3.ca-central-1.amazonaws.com/logos/pbp-logo.png"
            className="mx-auto object-cover"
            width={52.5}
            height={48}
          />
          <h2 className="mt-6 text-balance text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Dropshipping with Powered by People
          </h2>
          <p className="max-w mt-2 text-balance text-center text-sm text-gray-600 dark:text-neutral-400">
            Register here to access products from our exclusive network of
            suppliers
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <div className="relative mb-5 rounded-xl bg-white p-4 shadow dark:bg-neutral-900 sm:p-7">
          <RegisterDistributorForm />
        </div>
      </div>
      <div className="flex flex-col p-6 pt-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <p className="max-w mt-2 text-balance text-center text-sm text-gray-600 dark:text-neutral-400">
            Powered by
          </p>
          <Image
            alt="DropCommerce"
            src="https://dropcommerce-images.s3.ca-central-1.amazonaws.com/logos/dc-logo.png"
            className="mx-auto object-cover"
            width={210}
            height={192}
          />
        </div>
      </div>
    </>
  );
}
