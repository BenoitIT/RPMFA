"use server";
import React from "react";
import { FcFlashOn } from "react-icons/fc";
import { MdOutlineRecentActors } from "react-icons/md";
import Link from "next/link";
import { PiCertificate, PiHouseLine } from "react-icons/pi";
import { auth } from "@/auth";
import Contribution from "./(contents)/recentContribution";

const Dashboard = async () => {
  const session: any = await auth();
  const userId = session?.user?.id;
  const response = await fetch(
    `${process.env.NEXT_APP_URL}/api/dashboardInfo/user/${userId}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  if (data.status == 200) {
    return (
      <div className="mt-4 w-full">
        <h1 className="text-2xl text-blue-1 font-semibold">
          Quick Insight <FcFlashOn className="inline text-2xl" />
        </h1>
        <div className="grid md:grid-cols-3 max:md:grid-cols-2 max-sm:grid-cols-1 gap-10 mt-8">
          <Link href={"/member/dashboard/contributions"}>
            <DashbordCard
              title="Pending Contributions"
              value={`RWF ${data?.pendingContributionsValue}`}
              icon={<PiCertificate className="text-2xl text-blue-1" />}
            />
          </Link>
          <Link href={"/member/dashboard/contributions"}>
            <DashbordCard
              title="Total Contributions"
              value={`RWF ${data?.Approvedcontribution}`}
              icon={<PiHouseLine className="text-2xl text-blue-1" />}
            />
          </Link>
          <DashbordCard
            title="Recent Contributions"
            value={`RWF ${data?.latestContributionListValue}`}
            icon={<MdOutlineRecentActors className="text-2xl text-blue-1" />}
          />
        </div>
        <div className="py-4">
          <h1 className="text-base  text-blue-700">
            Recently Added Contributions
          </h1>
        </div>
        <Contribution contributions={data?.latestContributionList} />
      </div>
    );
  }
};
export default Dashboard;

interface DashbordCardProps {
  title: string;
  value: number | String;
  icon: any;
}

const DashbordCard = ({ title, value, icon }: DashbordCardProps) => {
  return (
    <div className="w-full flex gap-1 p-4 rounded-md shadow bg-white items-center hover:cursor-pointer hover:bg-blue-50">
      <div className="flex items-center">{icon}</div>
      <div className="p-4">
        <h1 className="text-lg font-semibold">{value}</h1>
        <p className="text-sm font-light">{title}</p>
      </div>
    </div>
  );
};
