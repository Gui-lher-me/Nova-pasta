"use client";

import { Spinner } from "@/components/spinner";
import { PlaneIcon } from "@/icons";
import { useRef, useTransition } from "react";
import { toast } from "react-toastify";
import { message } from "../server/actions/inbox";

export function ChatFormInput({ receiverId, senderId, label }) {
  const [isPending, startTransition] = useTransition();

  const formRef = useRef(null);

  const submitAction = async (formData) => {
    startTransition(async () => {
      const data = await message({
        receiverId,
        senderId,
        label,
        message: formData.get("message"),
      });
      if (data?.message) {
        toast(data.message, {
          type: data?.error ? "error" : "success",
        });
      }
      if (formRef.current && !data?.error) {
        formRef.current.reset();
      }
    });
  };

  return (
    <form
      ref={formRef}
      action={submitAction}
      className="space-x-4.5 flex items-center gap-4"
    >
      <div className="relative flex-1">
        <input
          type="text"
          name="message"
          placeholder="Type something here"
          disabled={isPending}
          className="block w-full rounded-lg border-gray-200 p-4 text-sm focus:border-primary-500 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        />
        <button className="absolute right-4 top-1/2 inline-flex size-8 shrink-0 -translate-y-1/2 transform items-center justify-center rounded-lg bg-primary-600 text-white hover:bg-primary-500 focus:z-10 focus:bg-primary-500 focus:outline-none dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:bg-indigo-500">
          {isPending ? <Spinner /> : <PlaneIcon />}
        </button>
      </div>
    </form>
  );
}
