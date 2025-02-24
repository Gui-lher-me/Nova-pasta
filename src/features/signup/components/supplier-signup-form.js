"use client";

import { Button } from "@/components/button";
import { CheckboxField } from "@/components/checkbox-field";
import { InputField } from "@/components/input-field";
import { SelectField } from "@/components/select-field";
import { COUNTRIES, PLATFORMS } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { supplierSignupSchema } from "../schemas/signup";
import { signup } from "../server/actions/signup";

export function SupplierSignupForm() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(supplierSignupSchema),
    defaultValues: {
      name: "",
      website: "",
      phone: "",
      email: "",
      city: "",
      country: "",
      shipCountry: "",
      platform: "",
      discount: 0,
      supplierAgreementAccepted: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values) => {
    startTransition(async () => {
      const data = await signup(values);

      if (data.error) {
        toast(data.message, {
          type: "error",
        });
      } else if (data.redirectTo) {
        router.push(data.redirectTo);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <InputField
          stacked
          type="text"
          id="name"
          label="Company"
          placeholder="e.g. Acme Corporation"
          error={errors.name?.message}
          {...register("name")}
        />
        <InputField
          stacked
          type="text"
          id="website"
          label="Website"
          placeholder="e.g. https://www.example.com"
          error={errors.website?.message}
          {...register("website")}
        />
        <InputField
          stacked
          type="text"
          id="phone"
          label="Phone"
          placeholder="+x(xxx)xxx-xx-xx"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <InputField
          stacked
          type="email"
          id="email"
          label="Email"
          placeholder="e.g. john.doe@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <InputField
          stacked
          type="text"
          id="city"
          label="City"
          placeholder="e.g. New York"
          error={errors.city?.message}
          {...register("city")}
        />
        <SelectField
          stacked
          id="country"
          label="Your country"
          options={COUNTRIES}
          defaultValue={undefined}
          error={errors.country?.message}
          {...register("country")}
        />
        <SelectField
          stacked
          id="shipCountry"
          label="Ship from"
          options={COUNTRIES}
          defaultValue={undefined}
          error={errors.shipCountry?.message}
          {...register("shipCountry")}
        />
        <SelectField
          stacked
          id="platform"
          label="Platform"
          options={PLATFORMS}
          defaultValue={undefined}
          error={errors.platform?.message}
          {...register("platform")}
        />
        <InputField
          stacked
          type="number"
          id="discount"
          label="Margin"
          placeholder="e.g. 35"
          error={errors.discount?.message}
          {...register("discount", { valueAsNumber: true })}
          style="percentage"
          tooltip="Dropship suppliers are required to offer stores a minimum 30-40% margin compared to retail price, which is the store's profit. If your product costs $100 and you offer a 35% margin, stores will pay you $65 for the product when sold. You can adjust prices manually later on a product level"
        />
        <CheckboxField
          id="supplierAgreementAccepted"
          label={
            <>
              I accept the{" "}
              <a
                className="href= inline-flex items-center gap-x-1 text-sm font-medium text-primary-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-primary-500"
                href="https://help.dropcommerce.com/en/articles/4364902-dropcommerce-supplier-agreement"
                target="_blank"
              >
                Terms and Conditions
              </a>
            </>
          }
          error={errors.supplierAgreementAccepted?.message}
          {...register("supplierAgreementAccepted")}
          defaultChecked={false}
        />
      </div>
      <div className="mt-5">
        <Button fullWidth loading={isPending}>
          Sign up
        </Button>
      </div>
    </form>
  );
}
