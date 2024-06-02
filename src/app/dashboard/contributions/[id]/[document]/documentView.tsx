"use client";

import DocumentView from "@/app/dashboard/(components)/ContentsContainers/DocumentView";
import { PiGreaterThanLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
const DocumentViewArea = ({ document }: any) => {
  const router = useRouter();
  return (
    <div className="mt-4 w-full h-[90vh]">
      <h3 className="text-gray-600 text-sm flex gap-1">
        <p
          onClick={() => router.push("/dashboard")}
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Home
        </p>
        <PiGreaterThanLight className="mt-[3px]" />
        <p
          onClick={() => router.push("/dashboard/contributions")}
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Contributions
        </p>
        <PiGreaterThanLight className="mt-[3px]" />
        <p
          onClick={() => router.back()}
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Contribution Details
        </p>
        <PiGreaterThanLight className="mt-[3px]" />
        <p className="text-blue-700 hover:cursor-pointer">document view</p>
      </h3>
      <div className="bg-blue-50 p-6 h-full -ml-4 mt-3">
        <DocumentView document={document} />
      </div>
    </div>
  );
};
export default DocumentViewArea;
