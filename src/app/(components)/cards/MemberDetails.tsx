import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { ExpandCollapseProps } from "../../../../types";
import ExpandCollapseButton from "../buttons/ExpandCollapseButton";

const MemberDetails = ({ expanded, handleExpand,fistName,lastName,category,email,phoneNumber,facilitityName }: ExpandCollapseProps) => {
  return (
    <div
      className={`relative flex flex-col gap-2 border border-gray-150 p-5 rounded-lg transition-all duration-300 ${
        expanded ? "h-auto" : "h-36"
      }`}
    >
      <div className="absolute top-1 right-1">
        {/* Expand Buttons */}
        <ExpandCollapseButton
          expandIcon={<IoIosArrowDown />}
          collapseIcon={<IoIosArrowUp />}
          expanded={expanded}
          handleExpand={handleExpand}
        />
      </div>
      {/* profile */}
      <div className="grid h-16 w-16 rounded-full bg-gray-1 place-content-center font-medium uppercase">
        {fistName[0]+lastName[0]}
      </div>
      {/* clinic name */}
      <h2 className="text-blue-1 text-base font-semibold">
        {facilitityName}
      </h2>
      {/* facility category */}
      <div className={`${expanded ? "block" : "hidden"} grid gap-y-1 text-sm`}>
        <div className="grid gap-y-1">
          <h3 className="text-l">Category of Health Facility</h3>
          <p className="font-extralight">{category}</p>
        </div>
        {/* Email Address */}
        <div className="grid gap-y-1">
          <h3 className="text-l">Email Address</h3>
          <p className="font-extralight">{email}</p>
        </div>
        {/* Phone Number */}
        <div className="grid gap-y-1">
          <h3 className="text-l">Phone Number</h3>
          <p className="font-extralight">{phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
