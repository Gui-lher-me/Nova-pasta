"use client";

import { QuestionMarkIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Tooltip({
  children,
  preferredPosition = "below" /* 'above' | 'below' */,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div className="hs-tooltip relative inline-block">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        type="button"
        className="hs-tooltip-toggle ms-1 cursor-auto"
      >
        <QuestionMarkIcon className="inline-block size-3 text-gray-400 dark:text-neutral-600" />
      </button>
      {isVisible && (
        <span
          className={cn(
            "absolute -left-[20px] z-10 inline-block w-40 rounded bg-gray-900 px-2 py-1 text-center text-xs font-medium text-white opacity-100 shadow-sm transition-opacity dark:bg-neutral-700",
            preferredPosition === "above" ? "bottom-[20px]" : "",
            preferredPosition === "below" ? "top-[20px]" : "",
          )}
          role="tooltip"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </span>
      )}
    </div>
  );
}
