"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import ExpandCollapseButton from "../buttons/ExpandCollapseButton";

interface AnnouncementsProps {
  haveActions?: boolean;
  announcementId?: number;
}
const AnnouncementCard = ({
  haveActions,
  announcementId,
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
              <span className="text-red-500 text-base">
                <RiDeleteBin6Line />
              </span>
              <span className="text-gray-500 text-base">
                <GrEdit />
              </span>
            </div>
          )}
        </div>
        <h1 className="font-semibold text-base text-gray-700">
          Some announcement here
        </h1>
        <p
          className={`${
            expanded ? "block text-sm text-gray-500" : "hidden text-sm"
          }`}
        >
          Lorem ipsum dolor sit amet consectetur. Ut tristique sem risus
          ultrices cras pharetra a sed urna. Lorem molestie morbi est praesent
          in tempus eu consectetur diam. Penatibus at iaculis amet mauris. Velit
          aenean ultricies vestibulum condimentum porttitor lectus mattis
          volutpat commodo.
        </p>
        <p className="text-sm">24/04/2024</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
