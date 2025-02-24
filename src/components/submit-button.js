import { useFormStatus } from "react-dom";
import { Button } from "./button";

export function SubmitButton({ children, fullWidth, disabled, ...rest }) {
  const { pending } = useFormStatus();

  return (
    <Button
      loading={pending}
      className={fullWidth ? "w-full" : ""}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
}
