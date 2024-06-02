"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import Applications from "../(components)/ContentsContainers/applications";
import Link from "next/link";


const Page = async () => {
  const response = await fetch(`${process.env.NEXT_APP_URL}/api/applications`, {
    cache: "no-store",
  });
  const statsResponse = await fetch(
    `${process.env.NEXT_APP_URL}/api/applications/stats`,
    { cache: "no-store" }
  );
  const data = await response.json();
  const statsData = await statsResponse.json();
  if (data.status === 200 && statsData.status === 200) {
    const tabs = statsData.tabs;
    const applications = data.applications?.map((application: any) => ({
      id: application?.id,
      facilityName: application?.facilityName?.toLowerCase(),
      category: application.facilityCategory,
      email: application.user?.email,
      phone: application.user?.phone,
      firstName: application.user?.firstName,
      lastName: application.user?.lastName,
      status: application?.status,
    }));
    return (
      <div className="mt-4 w-full">
        <h3 className="text-gray-600 text-sm flex gap-1">
        <Link href="/dashboard" className="hover:text-blue-700 hover:cursor-pointer">Home</Link>
          <PiGreaterThanLight className="mt-[3px]" />
          <p className="text-blue-700 ">Applications</p>
        </h3>
        <Applications applications={applications} tabs={tabs} />
      </div>
    );
  }
};

export default Page;
