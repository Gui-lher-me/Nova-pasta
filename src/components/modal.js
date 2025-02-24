"use client";

import { XIcon } from "@/icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ReactPortal } from "./react-portal";

export function Modal({ children }) {
  const { back } = useRouter();

  // Effect to add and clean up the keydown event listener
  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault(); // Prevent any default behavior
        back(); // Close the modal by navigating back
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [back]);

  // The 'back' function from 'useRouter' is stable and will not change across renders.
  // This means we don't need to worry about adding 'back' to the dependency array
  // in terms of performance issues. However, it's a good practice to include it
  // to avoid any potential bugs if the implementation of the router changes.

  return (
    <ReactPortal wrapperId="modal-root-id">
      <div
        id="hs-danger-alert"
        className="hs-overlay fixed start-0 top-0 z-[80] grid size-full place-items-center overflow-y-auto overflow-x-hidden bg-black/50"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-danger-alert-label"
        aria-modal="true"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 m-3 mt-0 opacity-100 transition-all ease-out md:mx-auto md:w-full md:max-w-[800px]">
          <div className="relative flex min-w-[336px] flex-col overflow-hidden rounded-xl border bg-white pt-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="absolute end-2 top-2">
              <button
                onClick={back}
                className="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <XIcon />
              </button>
            </div>
            <div className="p-4 sm:p-7">{children}</div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}

export function ModalHeader({ children }) {
  return children;
}

export function ModalTitle({ children }) {
  return (
    <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-neutral-200 sm:mb-4">
      {children}
    </h2>
  );
}

export function ModalDescription({ children }) {
  return children;
}

export function ModalContent({ children }) {
  return children;
}

export function ModalFooter({ children }) {
  return children;
}
