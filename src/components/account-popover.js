"use client";

import Image from "next/image";
import { useState } from "react";
import { BasePopover } from "./base-popover";
import { LogoutButton } from "./logout-button";

export function AccountPopover({ name, image, accountType, logout, children }) {
  const [popoverActive, setPopoverActive] = useState(false);

  const handleTogglePopover = () => {
    setPopoverActive((p) => !p);
  };

  const handleClosePopover = () => {
    setPopoverActive(false);
  };

  const activator = (
    <button
      onClick={handleTogglePopover}
      type="button"
      className="inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 overflow-hidden rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700"
    >
      <Image
        alt="A user's avatar"
        src={image}
        className="inline-block size-[36.4px] object-contain ring-2 ring-white dark:ring-neutral-800"
        width={320}
        height={320}
      />
    </button>
  );

  return (
    <BasePopover
      activator={activator}
      active={popoverActive}
      onClose={handleClosePopover}
    >
      <div className="min-w-64 divide-y divide-gray-200 dark:divide-neutral-700">
        {name && (
          <div className="relative rounded-t-lg bg-gray-100 px-5 py-3 dark:bg-neutral-700">
            <span className="absolute right-2 inline-flex rotate-[5deg] items-center rounded-full bg-gradient-to-r from-[#32968e] to-[#50C878] px-1.5 py-0.5 text-xs font-medium text-white">
              {accountType}
            </span>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              Signed in as
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
              {name}
            </p>
          </div>
        )}
        {children && <div className="space-y-0.5 p-1.5">{children}</div>}
        <div className="space-y-0.5 p-1.5">
          <LogoutButton logout={logout}>Sign out</LogoutButton>
        </div>
      </div>
    </BasePopover>
  );
}
