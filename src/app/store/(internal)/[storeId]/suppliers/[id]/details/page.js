import { PageWrapper } from "@/components/page-wrapper";

export default Page;

function Page({ params }) {
  return (
    <PageWrapper narrowWidth title="Supplier details">
      {params.id}
    </PageWrapper>
  );
}
