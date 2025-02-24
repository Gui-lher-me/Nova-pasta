"use client";

import { Button } from "@/components/button";
import { CheckIcon, ExportIcon } from "@/icons";
import { FileDownloader } from "@/lib/utils";
import Link from "next/link";

export function OrderActions({ showPrimaryButton, packingSlip }) {
  return (
    <div className="inline-flex gap-x-2">
      {packingSlip !== null && (
        <Button
          onClick={() => {
            const downloader = new FileDownloader(packingSlip);
            downloader.downloadFile();
          }}
          variant="outline"
        >
          <ExportIcon className="size-4" />
          Download PDF
        </Button>
      )}
      {showPrimaryButton && (
        <Button asChild>
          <Link href="edit/shipped">
            <CheckIcon className="size-4" />
            Mark as shipped
          </Link>
        </Button>
      )}
    </div>
  );
}
