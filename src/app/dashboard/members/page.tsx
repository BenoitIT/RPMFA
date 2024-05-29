"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import AllMembers from "../(components)/ContentsContainers/allmembers";
import Link from "next/link";

const Page = async () => {
  const response = await fetch(`${process.env.NEXT_APP_URL}/api/members`, {
    cache: "no-store",
  });
  const data = await response.json();
  if (data.status === 200) {
    const members = data.members?.map((member: any) => ({
      id: member?.id,
      facilityName: member?.facilityName?.toLowerCase(),
      category: member.facilityCategory,
      email: member.user?.email,
      phone: member.user?.phone,
      status: member?.status,
    }));
    return (
      <div className="mt-4 w-full">
        <h3 className="text-gray-600 text-sm flex gap-1">
          <Link
            href="/dashboard"
            className="hover:text-blue-700 hover:cursor-pointer"
          >
            Home
          </Link>
          <PiGreaterThanLight className="mt-[3px]" />
          <p className="text-blue-700 hover:cursor-pointer">Members</p>
        </h3>
        <AllMembers Allmembers={members} />
      </div>
    );
  }
};

export default Page;
