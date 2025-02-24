import Image from "next/image";
import Link from "next/link";
import {
  IntegrationCard,
  IntegrationCardBadge,
  IntegrationCardButton,
  IntegrationCardContent,
  IntegrationCardDescription,
  IntegrationCardFooter,
  IntegrationCardHeader,
  IntegrationCardImageWrapper,
  IntegrationCardIntegrationInfo,
  IntegrationCardTitle,
} from "../integration-card";
import { StripeConnectionButton } from "../stripe-connection-button";

export function PaymentsList({ isStripeConnected, paypalId }) {
  const isPayPalConnected = !!paypalId;

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <IntegrationCard>
        <IntegrationCardHeader>
          <IntegrationCardImageWrapper>
            <Image
              src="https://res.cloudinary.com/dropcommerce/image/upload/h_350/v1726695136/vdu8hg0ggdrssbnvhx09.png"
              alt="Stripe"
              className="h-[45px] w-[160px] object-contain"
              width={160}
              height={45}
            />
          </IntegrationCardImageWrapper>
          <IntegrationCardIntegrationInfo>
            {isStripeConnected
              ? "Connected to your Stripe account"
              : "Connect your Stripe account"}
          </IntegrationCardIntegrationInfo>
          <IntegrationCardTitle>Stripe</IntegrationCardTitle>
          <IntegrationCardDescription>
            Link your Stripe account to manage online payments with ease and
            security.
          </IntegrationCardDescription>
        </IntegrationCardHeader>
        <IntegrationCardContent>
          <IntegrationCardBadge
            status={isStripeConnected ? "success" : "error"}
          >
            {isStripeConnected ? "Connected" : "Disconnected"}
          </IntegrationCardBadge>
        </IntegrationCardContent>
        <IntegrationCardFooter>
          <StripeConnectionButton
            mode={isStripeConnected ? "disconnect" : "connect"}
          >
            {isStripeConnected ? "Disconnect" : "Connect"}
          </StripeConnectionButton>
        </IntegrationCardFooter>
      </IntegrationCard>

      <IntegrationCard>
        <IntegrationCardHeader>
          <IntegrationCardImageWrapper>
            <Image
              src="https://res.cloudinary.com/dropcommerce/image/upload/h_350/v1726695178/vkokhb6akbh1chbjlipw.png"
              alt="PayPal"
              className="h-[45px] w-[160px] object-contain"
              width={160}
              height={45}
            />
          </IntegrationCardImageWrapper>
          <IntegrationCardIntegrationInfo>
            {isPayPalConnected ? paypalId : "Connect your PayPal account"}
          </IntegrationCardIntegrationInfo>
          <IntegrationCardTitle>PayPal</IntegrationCardTitle>
          <IntegrationCardDescription>
            Integrate your PayPal account for secure payment processing and
            transactions.
          </IntegrationCardDescription>
        </IntegrationCardHeader>
        <IntegrationCardContent>
          <IntegrationCardBadge
            status={isPayPalConnected ? "success" : "error"}
          >
            {isPayPalConnected ? "Connected" : "Disconnected"}
          </IntegrationCardBadge>
        </IntegrationCardContent>
        <IntegrationCardFooter>
          <IntegrationCardButton asChild>
            <Link href="/settings/integrations/paypal">
              {isPayPalConnected ? "Update" : "Connect"}
            </Link>
          </IntegrationCardButton>
        </IntegrationCardFooter>
      </IntegrationCard>
    </div>
  );
}
