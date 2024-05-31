"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import AnnouncementContents from "@/app/announcements/(contents)/AnnouncementContents";
import Link from "next/link";

const Page = async () => {
  const response = await fetch(
    `${process.env.NEXT_APP_URL}/api/announcements`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  if (data.status == 200) {
    return (
      <div className="mt-4 w-full">
        <h3 className="text-gray-600 text-sm flex gap-1">
          <Link
            href="/member/dashboard"
            className="hover:text-blue-700 hover:cursor-pointer"
          >
            Home
          </Link>
          <PiGreaterThanLight className="mt-[3px]" />
          <p className="text-blue-700 hover:cursor-pointer">Announcements</p>
        </h3>
        <AnnouncementContents announcements={data.announcements} />
      </div>
    );
  }
};

export default Page;
