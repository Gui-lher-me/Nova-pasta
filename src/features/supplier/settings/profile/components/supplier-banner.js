import { Badge } from "@/components/badge";
import { EmailIcon, GlobeIcon } from "@/icons";
import {
  addHttpsIfNeeded,
  getSupplierLabel,
  getSupplierStatus,
} from "@/lib/utils";
import Image from "next/image";

export function SupplierBanner({ settings }) {
  return (
    <>
      <div className="flex items-center gap-x-3">
        <Image
          className="size-16 shrink-0 rounded-full object-contain"
          src={
            settings.logo ||
            "https://res.cloudinary.com/dropcommerce/image/upload/h_350/v1726695690/znmuh66nd7iurusfqf0r.jpg"
          }
          alt={settings.name}
          width={64}
          height={64}
        />
        <div className="grow">
          <h1 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
            {settings.name}
          </h1>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            {settings.short_description}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          {settings.description}
        </p>
        <ul className="mt-5 flex flex-col gap-y-3">
          <li className="flex items-center gap-x-2.5">
            <EmailIcon />
            <span className="text-[13px] text-gray-500 dark:text-neutral-500">
              {settings.email}
            </span>
          </li>
          {settings.website && (
            <li className="flex items-center gap-x-2.5">
              <GlobeIcon />
              <a
                className="text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:decoration-2 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-400"
                href={addHttpsIfNeeded(settings.website)}
                target="_blank"
              >
                {settings.website}
              </a>
            </li>
          )}
        </ul>
        <div className="mt-5">
          <Badge status={getSupplierStatus(settings.status)}>
            {getSupplierLabel(settings.status)}
          </Badge>
        </div>
      </div>
    </>
  );
}
