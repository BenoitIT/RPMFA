import React from "react";
import { FcFlashOn } from "react-icons/fc";
import { HiOutlineUserGroup } from "react-icons/hi2";

const Dashboard = () => {
  const arr = [1, 2, 3];
  return (
    <div className="mt-3">
      <h1 className="text-2xl text-blue-1 font-semibold">
        Quick Insight <FcFlashOn className="inline text-3xl" />
      </h1>
      <div className="grid grid-cols-3 max:md:grid-cols-2 max-sm:grid-cols-1 gap-10 mt-8">
        {
          arr.map((item, index) => (
            <DashbordCard key={index} title="Members" value={100} />
          ))
        }
      </div>
    </div>
  );
};

export default Dashboard;

interface DashbordCardProps {
  title: string;
  value: number;
}

const DashbordCard = ({ title, value }:DashbordCardProps) => {
  return (
    <div className="flex gap-6 p-4 rounded-md shadow-md bg-white items-center">
      <div className="flex items-center">
        <HiOutlineUserGroup className="text-3xl text-blue-1" />
      </div>
      <div className=" p-4">
        <h1 className="text-3xl  font-bold">{value}</h1>
        <p className="text-xl  font-light">{title}</p>
      </div>
    </div>
  );
}
