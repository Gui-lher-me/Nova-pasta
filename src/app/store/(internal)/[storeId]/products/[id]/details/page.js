import { PageWrapper } from "@/components/page-wrapper";

export default Page;

function Page({ params }) {
  return (
    <PageWrapper narrowWidth title="Product details">
      {params.id}
    </PageWrapper>
  );
}
