"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import AllMembers from "../(components)/ContentsContainers/allmembers";

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
          Home
          <PiGreaterThanLight className="mt-[4px]" />
          Members
        </h3>
        <AllMembers Allmembers={members}/>
      </div>
    );
  }
};

export default Page;
