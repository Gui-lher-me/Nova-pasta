import { createStripeAccountLink } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let accountLink;

  try {
    accountLink = await createStripeAccountLink(id);
  } catch (error) {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }

  redirect(accountLink.url);
}
