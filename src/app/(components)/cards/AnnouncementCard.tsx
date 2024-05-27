"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import ExpandCollapseButton from "../buttons/ExpandCollapseButton";
import { convertTimestamp } from "@/app/utilities/timeConverters";

interface AnnouncementsProps {
  haveActions?: boolean;
  announcementId?: number;
  title?:String;
  body?:String;
  time?:any;
  handleAnnouncementEdit?: (val: number) => void;
  handleEdit?: (val: number) => void;
}
const AnnouncementCard = ({
  haveActions,
  announcementId,
  title,
  body,
  time,
  handleEdit,
  handleAnnouncementEdit,
}: AnnouncementsProps) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="grid gap-4 shadow p-8 rounded-lg">
      <div className=" relative grid gap-2">
        <div className="absolute top-1 right-1 flex gap-2">
          <ExpandCollapseButton
            expandIcon={<FaPlus />}
            collapseIcon={<FaMinus />}
            expanded={expanded}
            handleExpand={handleExpand}
            className="bg-blue-1 text-white rounded-full p-1"
          />
          {haveActions && (
            <div className="flex gap-2">
              <span className="text-red-500 text-base hover:cursor-pointer" onClick={() => {
                  if (handleEdit && announcementId) {
                    handleEdit(announcementId);
                  }
                }}>
                <RiDeleteBin6Line />
              </span>
              <span
                className="text-gray-500 text-base hover:cursor-pointer"
                onClick={() => {
                  if (handleAnnouncementEdit && announcementId) {
                    handleAnnouncementEdit(announcementId);
                  }
                }}
              >
                <GrEdit />
              </span>
            </div>
          )}
        </div>
        <h1 className="font-semibold text-base text-gray-700">
          {title?title:""}
        </h1>
        <p
          className={`${
            expanded ? "block text-sm text-gray-500" : "hidden text-sm"
          }`}
        >
          {body?body:""}
        </p>
        <p className="text-sm">{time?convertTimestamp(time):""}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
