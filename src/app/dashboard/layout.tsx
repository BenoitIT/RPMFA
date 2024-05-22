import React, { ReactNode } from "react";
import Sidebar from "./(components)/Sidebar";
import Navbar from "./(components)/Navabar";

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-4 mt-14">{children}</div>
      </div>
    </div>
  );
};

export default SidebarLayout;
