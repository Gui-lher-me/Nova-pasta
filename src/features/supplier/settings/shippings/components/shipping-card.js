import { Badge } from "@/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { getCountryFromCode } from "@/constants";
import { getShippingLabel, getShippingStatus } from "../utils/shippings";
import { ShippingForm } from "./forms/shipping-form";

export function ShippingCard({ shippingOption, country, productId }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{getCountryFromCode(shippingOption.to_country)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="absolute right-4 top-4 z-10 sm:right-7 sm:top-7">
          <Badge status={getShippingStatus(!!shippingOption.deactivated)}>
            {getShippingLabel(!!shippingOption.deactivated)}
          </Badge>
        </div>
        <ShippingForm
          supplierCountry={country}
          defaultValues={shippingOption}
          productId={shippingOption.product}
          isAttachedToProduct={!!productId}
        />
      </CardContent>
    </Card>
  );
}
