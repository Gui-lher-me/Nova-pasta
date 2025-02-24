"use client";

import { InputField } from "@/components/input-field";
import { SelectField } from "@/components/select-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { NOTIFICATION_FREQUENCIES } from "@/constants";
import { useFormState } from "react-dom";
import { notifications } from "../server/actions/notifications";

export function NotificationsForm({ settings }) {
  const [state, formAction] = useFormState(notifications, undefined);

  const defaultValue = NOTIFICATION_FREQUENCIES.find(
    (freq) => freq.value === settings.inbox_notification_frequency,
  );

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <SelectField
          id="notification_frequency"
          label="Notification frequency"
          options={NOTIFICATION_FREQUENCIES}
          defaultValue={defaultValue?.value}
          error={state?.errors?.notification_frequency}
        />
        <InputField
          type="email"
          id="email"
          label="Email"
          placeholder="e.g. john.doe@example.com"
          defaultValue={settings.email}
          readOnly
          tooltip="Please contact support to update this information"
          error={state?.errors?.email}
        />
        <InputField
          type="email"
          id="notification_email"
          label="Notification email"
          placeholder="e.g. john.doe@example.com"
          defaultValue={settings.notification_email}
          error={state?.errors?.notification_email}
        />
        <InputField
          type="tel"
          id="phone"
          label="Phone number"
          placeholder="+x(xxx)xxx-xx-xx"
          defaultValue={settings.phone}
          readOnly
          tooltip="Please contact support to update this information"
          error={state?.errors?.phone}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end gap-x-2">
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
}
