"use server";
import "server-only";

import { COOKIE_NAMES, cookieOptions } from "@/constants";
import { catchError } from "@/lib/utils";
import { cookies } from "next/headers";
import { supplierSignupSchema } from "../../schemas/signup";
import { signup as signupDb } from "../db/signup";

export const signup = async ({
  name,
  website,
  phone,
  email,
  city,
  country,
  shipCountry,
  platform,
  discount,
  supplierAgreementAccepted,
}) => {
  const parsed = supplierSignupSchema.safeParse({
    name,
    website,
    phone,
    email,
    city,
    country,
    shipCountry,
    platform,
    discount,
    supplierAgreementAccepted,
  });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();

    return { errors: fieldErrors };
  }

  const [error, data] = await catchError(signupDb(parsed.data));

  if (error) {
    return {
      error: true,
      message:
        error.message ?? "An unexpected error occurred while signing up.",
    };
  }

  if (!data.token) {
    return {
      error: true,
      message: "Signup failed.",
    };
  }

  // Delete all access token cookies
  COOKIE_NAMES.forEach((cookie) => cookies().delete(cookie));

  // Set cookie
  cookies().set({
    name: "supplier_access_token",
    value: data.token,
    ...cookieOptions,
  });

  return {
    error: false,
    message: "Signup successful. Redirecting to products page...",
    redirectTo: "/products/?type=active",
  };
};
