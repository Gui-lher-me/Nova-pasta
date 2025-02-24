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

export function PlatformsList({ shopifyUrl, shopifyTokenSaved }) {
  const isShopifyConnected = shopifyUrl && shopifyTokenSaved;

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <IntegrationCard>
        <IntegrationCardHeader>
          <IntegrationCardImageWrapper>
            <Image
              src="https://res.cloudinary.com/dropcommerce/image/upload/v1602692803/shopify_nnjsqq.png"
              alt="Shopify"
              className="h-[45px] w-[160px] object-contain"
              width={160}
              height={45}
            />
          </IntegrationCardImageWrapper>
          <IntegrationCardIntegrationInfo>
            {isShopifyConnected ? shopifyUrl : "Connect your Shopify store"}
          </IntegrationCardIntegrationInfo>
          <IntegrationCardTitle>Shopify</IntegrationCardTitle>
          <IntegrationCardDescription>
            Seamlessly link your Shopify account to our app for streamlined
            management.
          </IntegrationCardDescription>
        </IntegrationCardHeader>
        <IntegrationCardContent>
          <IntegrationCardBadge
            status={isShopifyConnected ? "success" : "error"}
          >
            {isShopifyConnected ? "Connected" : "Disconnected"}
          </IntegrationCardBadge>
        </IntegrationCardContent>
        {!isShopifyConnected && (
          <IntegrationCardFooter>
            <IntegrationCardButton asChild>
              <Link href="/settings/integrations/shopify">Connect</Link>
            </IntegrationCardButton>
          </IntegrationCardFooter>
        )}
      </IntegrationCard>
    </div>
  );
}
