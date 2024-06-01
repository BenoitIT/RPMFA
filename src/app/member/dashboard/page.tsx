
"use server";
import React from "react";
import { FcFlashOn } from "react-icons/fc";
const Dashboard = async () => {
    return (
      <div className="mt-4 w-full">
        <h1 className="text-2xl text-blue-1 font-semibold">
          Quick Insight <FcFlashOn className="inline text-2xl" />
        </h1>

      </div>
    );
};
export default Dashboard;

interface DashbordCardProps {
  title: string;
  value: number;
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
