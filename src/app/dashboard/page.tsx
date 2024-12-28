"use client";
import React, { useEffect, useState } from "react";
import { FcFlashOn } from "react-icons/fc";
import { LuCheckSquare } from "react-icons/lu";
import { PiUsersFourThin } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import AllMembers from "./(components)/ContentsContainers/allmembers";
import Link from "next/link";
import FilterButton from "../(components)/buttons/FilterButton";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import MonthOrYear from "./(components)/inputs/input";
import Loader from "./(components)/ContentsContainers/loader";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const session: any = useSession();
  const token = session?.data?.user?.name?.accessToken;
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState<any>();
  const [year, setYear] = useState(currentYear);
  useEffect(() => {
    const getStats = async () => {
      const response = await fetch(`/api/dashboardInfo?year=${year}`, {
        cache: "no-store",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setData(data);
    };
    getStats();
  }, [year]);
  if (data?.status) {
    const years = Array.from(
      { length: 60 },
      (_, index) => new Date().getFullYear() - 30 + index
    );
    const handYearChange = (event: any) => {
      setYear(event.target.value);
    };
    return (
      <div className="mt-4 w-full">
        <div className="w-full flex justify-between flex-col md:flex-row gap-2">
          <h1 className="text-2xl text-blue-1 font-semibold">
            Quick Insight <FcFlashOn className="inline text-2xl" />
          </h1>
          <div className="flex gap-2">
            <FilterButton
              className={`block text-sm`}
              icon={<MdOutlineSettingsInputComposite />}
              btnText="Filter"
            />
            <div className={"w-fit mt-2"}>
              <MonthOrYear
                label="Year"
                value={year}
                options={years}
                onChange={handYearChange}
              />
            </div>
          </div>
        </div>
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
            title="Members without Arrears"
            value={data?.settleContributionCount}
            icon={<LuCheckSquare className="text-2xl text-blue-1" />}
          />
          <DashbordCard
            title="Total Annual Contribution"
            value={
              Intl.NumberFormat("en-US").format(data?.totalSettled) +
              " " +
              "RWF"
            }
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
  } else {
    return <Loader />;
  }
};
export default Dashboard;

interface DashbordCardProps {
  title: string;
  value: number | string;
  icon: any;
}

const DashbordCard = ({ title, value, icon }: DashbordCardProps) => {
  return (
    <div className="w-full flex gap-3 p-4 rounded-md shadow bg-white items-center hover:cursor-pointer hover:bg-blue-50">
      <div className="flex items-center">{icon}</div>
      <div>
        <h1 className="text-lg font-semibold">{value}</h1>
        <p className="text-sm font-light">{title}</p>
      </div>
    </div>
  );
};
