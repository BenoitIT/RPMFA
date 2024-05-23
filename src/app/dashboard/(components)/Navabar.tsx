"use client";

import React, { useState } from "react";
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosNotificationsOutline,
} from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import SecondBtn from "@/app/(components)/buttons/SecondBtn";
import { Drawer } from "antd";
import SidebarElements from "./sidebar/SidebarElements";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-20 border-b fixed max-sm:gap-10 justify-between max-sm:left-0 left-64 top-0 max-md:left-0 right-0 bg-white z-10 flex items-center max-sm:px-1 max-md:px-2 px-4 py-2">
      <h1 className="text-lg max-sm:hidden">Dashboard</h1>
      <SecondBtn
        customStyle="hidden max-sm:inline-flex items-center mt-1 border  w-10 h-10 hover:bg-blue-1 hover:text-white justify-center rounded"
        onClick={() => {
          setIsOpen(true);
        }}
        icon={<IoMenuSharp className="text-3xl" />}
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
        />
      </Drawer>
      <div className="">
        <div className="flex max-sm:gap-10 gap-8 items-center">
          <div className="relative">
            <div className="absolute bg-blue-1 rounded-full h-2.5 w-2.5 right-1" />
            <IoIosNotificationsOutline className="text-3xl" />
          </div>
          <button>
            <div className="flex gap-3 py-2 px-4 border-2 bg-gray-1 border-blue-1 items-center rounded-3xl">
              <p className="text-sm bg-blue-1 py-1 px-2 text-white rounded-full">
                G
              </p>
              <p className="text-sm">Grace</p>
              <p className="text-sm">{<IoIosArrowUp className="text-xl" />}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
