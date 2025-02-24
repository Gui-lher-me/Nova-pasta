import { PageWrapper } from "@/components/page-wrapper";

export default Page;

function Page({ params }) {
  return (
    <PageWrapper narrowWidth title="Prebuilt store details">
      {params.id}
    </PageWrapper>
  );
}
