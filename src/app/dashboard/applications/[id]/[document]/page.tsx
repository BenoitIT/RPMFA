"use server";
import DocumentView from "@/app/dashboard/(components)/ContentsContainers/DocumentView";
import { PiGreaterThanLight } from "react-icons/pi";

const Page = async ({ params }: any) => {
  const document = params.document;
  return (
    <div className="mt-4 w-full h-[90vh]">
      <h3 className="text-gray-600 text-sm flex gap-1">
        Home
        <PiGreaterThanLight className="mt-[4px]" />
        Applications
        <PiGreaterThanLight className="mt-[4px]" />
        Application Details
        <PiGreaterThanLight className="mt-[4px]" />
        document view
      </h3>
      <div className="bg-blue-50 p-6 h-full -ml-4 mt-3">
        <DocumentView document={document} />
      </div>
    </div>
  );
};

export default Page;
