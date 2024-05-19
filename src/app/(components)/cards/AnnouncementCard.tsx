"use client";

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import ExpandCollapseButton from "../buttons/ExpandCollapseButton";

const AnnouncementCard = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="grid gap-4 shadow-md p-8 rounded-lg">
      <div className=" relative grid gap-2">
        <div className="absolute top-1 right-1">
          <ExpandCollapseButton
            expandIcon={<FaPlus />}
            collapseIcon={<FaMinus />}
            expanded={expanded}
            handleExpand={handleExpand}
            className="bg-blue-1 text-white rounded-full p-1"
          />
        </div>
        <h1 className="font-semibold text-base">Some announcement here</h1>
        <p className={`${expanded ? "block text-sm" : "hidden text-sm"}`}>
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
