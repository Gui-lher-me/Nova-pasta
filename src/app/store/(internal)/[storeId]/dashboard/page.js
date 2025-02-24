import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { GridView } from "@/components/grid-view";
import { PageWrapper } from "@/components/page-wrapper";
import { ReviewCard } from "@/features/store/dashboard/components/review-card";
import { prebuiltStores } from "@/features/store/dashboard/data/dashboard";
import { PrebuiltItem } from "@/features/store/prebuilt-stores/components/prebuilt-item";
import { ProductItem } from "@/features/store/products/components/product-item";
import { SupplierItem } from "@/features/store/suppliers/components/supplier-item";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default Page;

async function Page({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  if (!token) {
    return redirect("/auth/?mode=login");
  }

  const storeId = params.storeId;

  const data = await getDashboardData();

  return (
    <PageWrapper title="Dashboard">
      {data.showReview && <ReviewCard />}
      {data.showPremade && (
        <Card className="bg-transparent shadow-none dark:bg-transparent">
          <CardHeader>
            <CardTitle>Shopify starter stores</CardTitle>
          </CardHeader>
          <CardContent>
            <GridView>
              {prebuiltStores.map((item) => (
                <PrebuiltItem key={item.id} item={item} />
              ))}
            </GridView>
          </CardContent>
          <CardFooter justifyEnd>
            <Button variant="outline" asChild>
              <Link href={`/store/${storeId}/prebuilt-stores`}>View all</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
      {data.featuredSuppliers.length > 0 && (
        <Card className="bg-transparent shadow-none dark:bg-transparent">
          <CardHeader>
            <CardTitle>Featured suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <GridView>
              {data.featuredSuppliers.map((supplier) => (
                <SupplierItem
                  key={supplier.id}
                  supplier={supplier}
                  storeId={storeId}
                />
              ))}
            </GridView>
          </CardContent>
          <CardFooter justifyEnd>
            <Button variant="outline" asChild>
              <Link href={`/store/${storeId}/suppliers`}>View all</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
      {data.newSuppliers.length > 0 && (
        <Card className="bg-transparent shadow-none dark:bg-transparent">
          <CardHeader>
            <CardTitle>New suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <GridView>
              {data.newSuppliers.map((supplier) => (
                <SupplierItem
                  key={supplier.id}
                  supplier={supplier}
                  storeId={storeId}
                />
              ))}
            </GridView>
          </CardContent>
          <CardFooter justifyEnd>
            <Button variant="outline" asChild>
              <Link href={`/store/${storeId}/suppliers`}>View all</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
      {data.topSelling.length > 0 && (
        <Card className="bg-transparent shadow-none dark:bg-transparent">
          <CardHeader>
            <CardTitle>Top selling products</CardTitle>
            <CardDescription>Based on your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <GridView>
              {data.topSelling.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </GridView>
          </CardContent>
          <CardFooter justifyEnd>
            <Button variant="outline" asChild>
              <Link href={`/store/${storeId}/products`}>View all</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
      {data.recommended.length > 0 && (
        <Card className="bg-transparent shadow-none dark:bg-transparent">
          <CardHeader>
            <CardTitle>Recommended products</CardTitle>
          </CardHeader>
          <CardContent>
            <GridView>
              {data.recommended.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </GridView>
          </CardContent>
          <CardFooter justifyEnd>
            <Button variant="outline" asChild>
              <Link href={`/store/${storeId}/products`}>View all</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </PageWrapper>
  );
}

async function getDashboardData() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("store_access_token")?.value;

    const url = new URL(
      "/reseller/dashboard/", // needs a trailing slash
      process.env.CORE_API_URL,
    );
    // url.searchParams.set("store", 123);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["store-dashboard"] },
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to fetch dashboard data");
    }

    const data = await rawResponse.json();

    return data;
  } catch (error) {
    console.error(
      "An unexpected error happened while fetching the dashboard data",
    );
    throw error;
  }
}
