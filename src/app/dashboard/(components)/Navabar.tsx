"use client";

import React, { useEffect, useState } from "react";
import {
  IoIosArrowUp,
  IoIosNotificationsOutline,
  IoIosArrowDown,
} from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import SecondBtn from "@/app/(components)/buttons/SecondBtn";
import { Drawer } from "antd";
import { signOut, useSession } from "next-auth/react";
import SidebarElements from "./sidebar/SidebarElements";
import Link from "next/link";
import {
  DashboardLinks,
  adminHomeMenu,
  profileAndSupportLinks,
  memberHomeMenu,
  membersDashboardLinks,
} from "./links";
import { SidebarMenu } from "./sidebar/Sidebar";
import Notifcations from "./cards/notification";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openProfileMenus, setProfileMenus] = useState(false);
  const [DashLinks, setDashLinks] = useState<SidebarMenu[]>([]);
  const [dashBordMainMenu, setDashBordMainMenu] =
    useState<SidebarMenu>(adminHomeMenu);
  const [profile, setDashProfile] = useState<SidebarMenu[]>([]);
  const [notifications, setNotification] = useState<any[]>([]);
  const [refresh, setRefesh] = useState<boolean>(false);
  const [displayNotification, setDisplayNotification] = useState(false);
  const session: any = useSession();
  const handleModalDisplay = () => {
    setProfileMenus(!openProfileMenus);
  };
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/auth/login";
  };
  useEffect(() => {
    if (session?.data?.user?.role == "admin") {
      setDashLinks(DashboardLinks);
      setDashBordMainMenu(adminHomeMenu);
      setDashProfile(profileAndSupportLinks);
    } else {
      setDashLinks(membersDashboardLinks);
      setDashBordMainMenu(memberHomeMenu);
      setDashProfile(membersDashboardLinks);
    }
  }, [session?.user?.role]);
  setTimeout(() => {
    setRefesh(!refresh);
  }, 1000 * 60);
  useEffect(() => {
    const fetchNotifications = async () => {
      if (session || refresh) {
        if (session?.data?.user?.role == "admin") {
          const response = await fetch("/api/notification/admin", {
            cache: "no-store",
          });
          const data = await response.json();
          if (data.status == 200) {
            setNotification(data.data);
          }
        } else {
          const response = await fetch(
            `/api/notification/${session?.data?.user?.id}`,
            {
              cache: "no-store",
            }
          );
          const data = await response.json();
          if (data.status == 200) {
            setNotification(data.data);
          }
        }
      }
    };
    fetchNotifications();
  }, [session, refresh]);
  const handleMarkAsRead = async (id: string | number) => {
    const response = await fetch(`/api/notification/${id}`, {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const data = await response.json();
    if (data.status == 200) {
      setRefesh(!refresh);
    }
  };
  return (
    <div className="h-20 fixed w-full lg:w-5/6">
      <div className="h-20 border-b flex max-sm:gap-10 justify-between max-sm:left-0 left-64 top-0 max-md:left-0 right-0 bg-white z-50  items-center max-sm:px-1 max-md:px-2 px-4 py-2 w-full lg:w-[97%]">
        <h1 className="text-lg max-sm:hidden font-normal uppercase">
          {" "}
          {session?.data?.user?.role == "member"
            ? "Member's Dashboard"
            : "Dashboard"}
        </h1>
        <SecondBtn
          customStyle="hidden max-sm:inline-flex items-center mt-1 border  w-10 h-10 hover:bg-blue-1 hover:text-white justify-center rounded"
          onClick={() => {
            setIsOpen(true);
          }}
          icon={<IoMenuSharp className="text-3xl text-gray-700" />}
          type="button"
        />
        <Drawer
          width={"17rem"}
          placement="left"
          closable={true}
          onClose={() => {
            setIsOpen(false);
          }}
          maskClosable={true}
          destroyOnClose={true}
          open={isOpen}
        >
          <SidebarElements
            className="max-h-screen"
            onclick={() => setIsOpen(!isOpen)}
            DashboardLinks={DashLinks}
            SidebarFooterMenu={profile}
            HomeMenu={dashBordMainMenu}
          />
        </Drawer>
        <div className="relative">
          <div className="flex max-sm:gap-4 gap-4 lg:gap-8 items-center">
            <div
              className="relative"
              onClick={() => setDisplayNotification(!displayNotification)}
            >
              <div
                className={`absolute ${
                  notifications.length > 0
                    ? "bg-blue-1 animate-pulse"
                    : "bg-gray-500"
                }  rounded-full h-2.5 w-2.5 right-1`}
              />
              <IoIosNotificationsOutline className="text-3xl text-gray-700 hover:cursor-pointer" />
            </div>
            <button>
              <div className="flex gap-3 py-2 px-4 border-2 bg-gray-1 border-blue-1 items-center rounded-3xl">
                <p className="text-xs md:text-sm bg-blue-1 py-1 px-2 text-white rounded-full uppercase font-medium">
                  {session?.data?.user?.name?.first[0] ||
                    "" + "" + session?.data?.user?.name?.last[0] ||
                    ""}
                </p>
                <p className="text-sm capitalize">
                  {session?.data?.user?.name?.last || ""}
                </p>
                <p className="text-sm" onClick={handleModalDisplay}>
                  {openProfileMenus ? (
                    <IoIosArrowUp className="text-xl" />
                  ) : (
                    <IoIosArrowDown className="text-xl" />
                  )}
                </p>
              </div>
            </button>
          </div>
          {openProfileMenus && (
            <div className="bg-white py-4 flex flex-col gap-2 absolute right-2 w-[150px] rounded shadow text-sm">
              <p className="text-center w-full py-1 hover:bg-blue-700 hover:text-white rounded-sm hover:cursor-pointer">
                {session?.data?.user?.role == "member" ? (
                  <Link href="/member/dashboard/profile">Profile</Link>
                ) : (
                  <Link href="/dashboard/profile">Profile</Link>
                )}
              </p>
              <p
                className="text-center w-full py-1 hover:bg-blue-700 hover:text-white rounded-sm hover:cursor-pointer"
                onClick={handleSignOut}
              >
                Logout
              </p>
            </div>
          )}
        </div>
        <Notifcations
          displayNotification={displayNotification}
          notifications={notifications}
          handleMarkAsRead={handleMarkAsRead}
        />
      </div>
    </div>
  );
};

export default Navbar;
