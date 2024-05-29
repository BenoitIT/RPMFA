"use server";
import DocumentViewArea from "./documentView";

const Page = async ({ params }: any) => {
  const document = params.document;
  return <DocumentViewArea document={document} />;
};

export default Page;
