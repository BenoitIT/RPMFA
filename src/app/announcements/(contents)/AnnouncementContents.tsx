"use client";

import FilterButton from "@/app/(components)/buttons/FilterButton";
import AnnouncementCard from "@/app/(components)/cards/AnnouncementCard";
import { AnnouncmentProps } from "@/app/dashboard/(components)/ContentsContainers/anouncements";
import { useState } from "react";
import { TbDatabaseX } from "react-icons/tb";

const AnnouncementContents = ({ announcements }: AnnouncmentProps) => {
  const [activeAnnouncements, setActiveAnnouncements] = useState(announcements);
  return (
    <>
      {Array.isArray(activeAnnouncements) && activeAnnouncements.length > 0 ? (
        <div className="w-full mx-auto">
          <div className="flex justify-between my-8 gap-y-3 max-sm:flex-col">
            <h1 className="text-xl font-medium text-blue-1">
              Announcements
            </h1>
            <div className="flex gap-3">
              <input
                type="date"
                name="date"
                id="date"
                className="border border-gray-200 rounded-lg p-2 w-50"
              />
              <FilterButton btnText="Filter" />
            </div>
          </div>
          <div className="grid gap-8 my-6 border border-gray-150 p-7 max-sm:p-1 rounded-md">
            {activeAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                title={announcement.subject}
                body={announcement.announcementbody}
                announcementId={announcement.id}
                time={announcement.createdAt}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[40vh] w-screen flex justify-center items-center text-sm flex-col gap-3 max-w-full">
          <TbDatabaseX className="text-4xl text-blue-300" />
          <p className="text-gray-700 font-light">There is no announcement for now.</p>
        </div>
      )}
    </>
  );
};

export default AnnouncementContents;
