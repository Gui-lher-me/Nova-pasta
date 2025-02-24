import { ChatSlashIcon } from "@/icons";

export default Page;

function Page() {
  return (
    <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
      <ChatSlashIcon />
      <p className="mt-2 text-sm text-gray-800 dark:text-neutral-300">
        No conversation selected
      </p>
    </div>
  );
}
