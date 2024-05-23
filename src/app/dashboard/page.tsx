import React from "react";
import { FcFlashOn } from "react-icons/fc";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { DashboardCardProps } from "../../../types";

const Dashboard = () => {
  const arr = [1, 2, 3];
  return (
    <div className="mt-5 w-full">
      <h1 className="text-xl text-blue-1 font-semibold">
        Quick Insight <FcFlashOn className="inline text-3xl" />
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
        {arr.map((item, index) => (
          <DashboardCard key={index} title="Members" value={100} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <div className="w-full flex gap-1 p-4 rounded-md shadow-lg bg-white items-center">
      <div className="flex items-center">
        <HiOutlineUserGroup className="text-3xl text-blue-1" />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-semibold">{value}</h1>
        <p className="text-lg font-light">{title}</p>
      </div>
    </div>
  );
};
