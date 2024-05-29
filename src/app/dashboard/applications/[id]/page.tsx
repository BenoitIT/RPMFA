"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import ApplicationDetails from "../../(components)/ContentsContainers/ApplicationDetails";
import Link from "next/link";

const Page = async ({ params }: any) => {
  const response = await fetch(
    `${process.env.NEXT_APP_URL}/api/applications/${params?.id}`,
    { cache: "no-store" }
  );
  const responseBody = await response.json();
  if (responseBody?.status == 200 || !responseBody.application == null) {
    const application = responseBody.application;
    return (
      <div className="mt-4 w-full h-[90vh]">
        <h3 className="text-gray-600 text-sm flex gap-1">
          <Link
            href="/dashboard"
            className="hover:text-blue-700 hover:cursor-pointer"
          >
            Home
          </Link>
          <PiGreaterThanLight className="mt-[3px]" />
          <Link
            href="/dashboard/applications"
            className="hover:text-blue-700 hover:cursor-pointer"
          >
            Applications
          </Link>
          <PiGreaterThanLight className="mt-[3px]" />
          <p className="text-blue-700 hover:cursor-pointer">
            Applications Details
          </p>
        </h3>
        <div className="bg-blue-50 p-6 h-full -ml-4 mt-3">
          <ApplicationDetails
            application={application}
            category="applications"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="text-xl font-thin h-[90vh] flex justify-center w-full items-center">
      <div className="p-4 w-fit text-white bg-red-400 rounded shadow">
        The requested application is not found
      </div>
    </div>
  );
};

export default Page;
