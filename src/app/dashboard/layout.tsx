import React, { ReactNode } from "react";
import Sidebar from "./(components)/sidebar/Sidebar";
import Navbar from "./(components)/Navabar";
import { DashboardLinks,adminHomeMenu, profileAndSupportLinks } from "./(components)/links";

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className="w-64 max-sm:hidden max-md:w-52">
        <Sidebar DashboardLinks={DashboardLinks} HomeMenu={adminHomeMenu} SidebarFooterMenu={profileAndSupportLinks}/>
      </div>
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="w-full p-4 mt-14">{children}</div>
      </div>
    </div>
  );
};

export default SidebarLayout;
