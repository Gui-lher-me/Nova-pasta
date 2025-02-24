import { forwardRef, useTransition } from "react";
import { toast } from "react-toastify";
import { Button } from "./button";
import { Dialog } from "./dialog";

export const ConfirmationModal = forwardRef(
  (
    {
      onClose,
      description,
      destructive = true,
      onError,
      onPrimaryAction,
      onSuccess,
      primaryActionContent,
      title,
    },
    ref,
  ) => {
    const [isPending, startTransition] = useTransition();

    const handleClick = async () => {
      startTransition(async () => {
        try {
          const data = await onPrimaryAction();

          if (data?.message) {
            toast(data.message, {
              type: data.error ? "error" : "success",
            });
          }

          // Trigger onSuccess or onError based on the response
          if (data?.error) {
            onError?.(data); // Call onError with the data if there was an error
          } else {
            onClose();
            onSuccess?.(data); // Call onSuccess with the data if the action was successful
          }
        } catch (error) {
          // Handle any unexpected errors
          onError?.(error); // Call onError with the error if something went wrong
        }
      });
    };

    return (
      <Dialog ref={ref} onClose={onClose}>
        <div className="overflow-y-auto p-4 sm:p-10">
          <div className="flex gap-x-4 md:gap-x-7">
            {/* Icon */}
            {/* <span className="inline-flex size-[46px] shrink-0 items-center justify-center rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:border-red-600 dark:bg-red-700 dark:text-red-100 sm:h-[62px] sm:w-[62px]">
              <svg
                className="size-5 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </span> */}
            {/* End Icon */}
            <div className="grow">
              <h3
                id="hs-danger-alert-label"
                className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200"
              >
                {title}
              </h3>
              <p className="text-gray-500 dark:text-neutral-500">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-2 border-t bg-gray-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
          <Button
            loading={isPending}
            onClick={handleClick}
            variant={destructive ? "destructive" : "default"}
          >
            {primaryActionContent}
          </Button>
        </div>
      </Dialog>
    );
  },
);

ConfirmationModal.displayName = "ConfirmationModal";
