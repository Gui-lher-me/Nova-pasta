"use client";

import { ConfirmationModal } from "@/components/confirmation-modal";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const ConfirmationModalContext = createContext();

export function ConfirmationModalProvider({ children }) {
  const dialogRef = useRef(null);
  const [modalData, setModalData] = useState(null);

  const openModal = (data) => {
    setModalData(data); // Set dynamic data
  };

  const closeModal = () => {
    setModalData(null); // Reset modal data on close
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    const handleClose = () => {
      if (modalData) {
        setModalData(null); // Ensure modalData is cleared when dialog is closed
      }
    };

    if (dialog) {
      dialog.addEventListener("close", handleClose); // Listen for the close event
    }

    // Open or close the dialog based on modalData
    if (modalData) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }

    return () => {
      if (dialog) {
        dialog.removeEventListener("close", handleClose); // Cleanup the listener
      }
    };
  }, [modalData]);

  return (
    <ConfirmationModalContext.Provider value={{ openModal }}>
      {children}
      <ConfirmationModal ref={dialogRef} onClose={closeModal} {...modalData} />
    </ConfirmationModalContext.Provider>
  );
}

export const useConfirmationModal = () => useContext(ConfirmationModalContext);
