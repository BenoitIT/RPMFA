"use server";
import React from "react";
import { FcFlashOn } from "react-icons/fc";
import { LuCheckSquare } from "react-icons/lu";
import { PiUsersFourThin } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import AllMembers from "./(components)/ContentsContainers/allmembers";
import Link from "next/link";

const Dashboard = async () => {
  const response = await fetch(
    `${process.env.NEXT_APP_URL}/api/dashboardInfo`,
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
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-8">
          <Link href={"/dashboard/members"}>
            <DashbordCard
              title="Total Members"
              value={data?.members}
              icon={<PiUsersFourThin className="text-2xl text-blue-1" />}
            />
          </Link>
          <Link href={"/dashboard/applications"}>
            <DashbordCard
              title="Total Applications"
              value={data?.application}
              icon={
                <VscGitPullRequestGoToChanges className="text-2xl text-blue-1" />
              }
            />
          </Link>
          <DashbordCard
            title="Settled Facilities"
            value={data?.settleContributionCount}
            icon={<LuCheckSquare className="text-2xl text-blue-1" />}
          />
          <DashbordCard
            title="Annually Contribution"
            value={Intl.NumberFormat("en-US").format(data?.totalSettled)+" "+"RWF"}
            icon={<GiTakeMyMoney className="text-2xl text-blue-1" />}
          />
        </div>
        <div className="py-4">
          <h1 className="xl:text-base  text-blue-700 text-sm">
            Recently Added Members
          </h1>
        </div>
        <AllMembers Allmembers={data?.latestMembers} filterHide={true} />
      </div>
    );
  }
};
export default Dashboard;

interface DashbordCardProps {
  title: string;
  value: number|string;
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
