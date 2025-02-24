import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function checkStripeConnection(stripeId) {
  const account = await stripe.accounts.retrieve(stripeId);

  return account.details_submitted && account.charges_enabled;
}

export async function createStripeAccount(email) {
  try {
    const account = await stripe.accounts.create({
      type: "express",
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    return account;
  } catch (error) {
    console.error("Error creating stripe account:", error);
    throw error;
  }
}

export async function createStripeAccountLink(accountId) {
  const baseUrl = process.env.NEXT_APP_URL ?? "";

  const refreshUrl = new URL(
    `/api/stripe/refresh-url/?id=${accountId}`,
    baseUrl,
  );
  const returnUrl = new URL("/settings/payment", baseUrl);

  try {
    const stripeAccountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl.toString(),
      return_url: returnUrl.toString(),
      type: "account_onboarding",
    });
    return stripeAccountLink;
  } catch (error) {
    console.error("Error creating stripe account link:", error);
    throw error;
  }
}
