"use client";

import { PageWrapper } from "@/components/page-wrapper";
import { UploadIcon } from "@/icons";
import { useRef, useTransition } from "react";
import { toast } from "react-toastify";
import { uploadLogo } from "../server/actions/profile";

export function ProfilePageWrapper({ children }) {
  const [isPending, startTransition] = useTransition();

  const inputRef = useRef(null);

  const handlePickClick = () => {
    inputRef.current.click();
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the selected image file (e.g., upload or display)
      const formData = new FormData();
      formData.set("logo", file);

      startTransition(async () => {
        const data = await uploadLogo(formData);
        if (data?.message) {
          toast(data.message, {
            type: data.error ? "error" : "success",
          });
        }
      });
    }
  };

  return (
    <PageWrapper
      backAction={undefined}
      narrowWidth
      title="Profile info"
      secondaryActions={[
        {
          content: "Upload logo",
          icon: UploadIcon,
          onAction: handlePickClick,
          loading: isPending,
        },
      ]}
    >
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleUpload}
        aria-describedby="logo-error"
      />
      {children}
    </PageWrapper>
  );
}
