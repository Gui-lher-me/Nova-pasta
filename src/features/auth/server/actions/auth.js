"use server";
import "server-only";

import { COOKIE_NAMES, cookieOptions } from "@/constants";
import { catchError } from "@/lib/utils";
import { cookies } from "next/headers";
import { loginSchema, signupSchema } from "../../schemas/auth";
import { login as loginDb, signup as signupDb } from "../db/auth";

const login = async ({ email, password }) => {
  const parsed = loginSchema.safeParse({ email, password });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return { errors: fieldErrors };
  }

  const [error, data] = await catchError(loginDb(parsed.data));

  if (error) {
    return {
      error: true,
      message: "An unexpected error occurred while logging in.",
    };
  }

  if (!data.token) {
    return {
      error: true,
      message: "Login failed. Please check your credentials and try again.",
    };
  }

  if (!["supplier", "accounts", "admin", "store"].includes(data.account_type)) {
    return {
      error: true,
      message: "Unknown account type. Please contact support.",
    };
  }

  if (["supplier", "accounts"].includes(data.account_type)) {
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
      message: "Login successful. Redirecting to products page...",
      redirectTo: "/products/?type=active",
    };
  }

  if (data.account_type === "admin") {
    // Delete all access token cookies
    COOKIE_NAMES.forEach((cookie) => cookies().delete(cookie));

    // Set cookie
    cookies().set({
      name: "admin_access_token",
      value: data.token,
      ...cookieOptions,
    });

    return {
      error: false,
      message: "Login successful. Redirecting to metrics page...",
      redirectTo: "/admin/metrics",
    };
  }

  if (data.account_type === "store") {
    if (data.stores && data.stores.length > 0) {
      // Delete all access token cookies
      COOKIE_NAMES.forEach((cookie) => cookies().delete(cookie));

      // Set cookie
      cookies().set({
        name: "store_access_token",
        value: data.token,
        ...cookieOptions,
      });

      // const redirectTo =
      //   data.stores.length === 1
      //     ? `/store/${data.stores[0].id}/products`
      //     : "/store/select-store";

      return {
        error: false,
        message: "Login successful. Redirecting to store selection...",
        redirectTo: "/store/select-store",
      };
    }

    return {
      error: true,
      message: "No stores found. Please contact support.",
    };
  }
};

const signup = async ({ email, password }) => {
  const parsed = signupSchema.safeParse({ email, password });

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
    name: "store_access_token",
    value: data.token,
    ...cookieOptions,
  });

  return {
    error: false,
    message: "Signup successful. Redirecting to store selection...",
    redirectTo: "/store/select-store",
  };
};

export const auth = async (mode, data) => {
  if (mode === "login") {
    return login(data);
  }
  return signup(data);
};
