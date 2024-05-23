import React from "react";
import { FcFlashOn } from "react-icons/fc";
import { HiOutlineUserGroup } from "react-icons/hi2";
import Members from "./(components)/ContentsContainers/recentmember";

const Dashboard = () => {
  const arr = [1, 2, 3];
  return (
    <div className="mt-4 w-full">
      <h1 className="text-2xl text-blue-1 font-semibold">
        Quick Insight <FcFlashOn className="inline text-2xl" />
      </h1>
      <div className="grid md:grid-cols-3 max:md:grid-cols-2 max-sm:grid-cols-1 gap-10 mt-8">
        {arr.map((item, index) => (
          <DashbordCard  key={index} title="Members" value={100} />
        ))}
      </div>
      <div className="py-4">
        <h1 className="text-base  text-blue-700">Recently Added Members</h1>
      </div>
      <Members />
    </div>
  );
};

export default Dashboard;

interface DashbordCardProps {
  title: string;
  value: number;
}

const DashbordCard = ({ title, value }: DashbordCardProps) => {
  return (
    <div className="w-full flex gap-1 p-4 rounded-md shadow bg-white items-center">
      <div className="flex items-center">
        <HiOutlineUserGroup className="text-3xl text-blue-1" />
      </div>
      <div className="p-4">
        <h1 className="text-lg font-semibold">{value}</h1>
        <p className="text-sm font-light">{title}</p>
      </div>
    </div>
  );
};

