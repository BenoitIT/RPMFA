"use server";

import Members from "./contents/members";
import { TbDatabaseX } from "react-icons/tb";

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
      lastName: member?.user?.lastName,
      firstName: member?.user.firstName,
    }));
    return <Members Allmembers={members} />;
  }
};

export default Page;
