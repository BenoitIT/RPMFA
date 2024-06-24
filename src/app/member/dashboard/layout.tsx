import React, { ReactNode } from "react";
import Sidebar from "@/app/dashboard/(components)/sidebar/Sidebar";
import {
  memberHomeMenu,
  memberProfileAndSupportLinks,
  membersDashboardLinks,
} from "@/app/dashboard/(components)/links";
import Navbar from "@/app/dashboard/(components)/Navabar";
import { auth } from "@/auth";
import Redirector from "@/app/(components)/redirector/Redirector";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session: any = await auth();
  const role: string = session?.user?.role;
  if (role == "member") {
    return (
      <div className="flex w-full">
        <div className="w-64 max-sm:hidden max-md:w-52">
          <div className="fixed w-64 max-sm:hidden max-md:w-52 ">
            <Sidebar
              DashboardLinks={membersDashboardLinks}
              HomeMenu={memberHomeMenu}
              SidebarFooterMenu={memberProfileAndSupportLinks}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <Navbar />
          <div className="w-full p-4 mt-14">{children}</div>
        </div>
      </div>
    );
  } else {
    return <Redirector />;
  }
};

export default Layout;
