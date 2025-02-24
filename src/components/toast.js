import { useEffect } from "react";
import { toast } from "react-toastify";

export function Toast({ message, error }) {
  useEffect(() => {
    if (!message) return;

    toast(message, {
      type: error ? "error" : "success",
    });
  }, [error, message]);

  return;
}
