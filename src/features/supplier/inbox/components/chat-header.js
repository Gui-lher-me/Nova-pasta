import Image from "next/image";

export function ChatHeader({ receiverEmail }) {
  return (
    <div className="border-b p-2 sm:p-4">
      <div className="flex items-center">
        <div className="relative mr-3">
          <Image
            className="size-10 rounded-full object-cover"
            src="https://res.cloudinary.com/dropcommerce/image/upload/h_350/v1726695690/znmuh66nd7iurusfqf0r.jpg"
            alt="avatar"
            width={40}
            height={40}
          />
          <span className="absolute bottom-0 end-0 block size-3 rounded-full bg-gray-400 ring-2 ring-white dark:ring-neutral-900" />
        </div>
        <div>
          <h2 className="font-semibold sm:text-lg">{receiverEmail}</h2>
          <p className="text-xs text-gray-500">Offline</p>
        </div>
      </div>
    </div>
  );
}
