"use client";
import FilterButton from "@/app/(components)/buttons/FilterButton";
import ButtonIconified from "@/app/(components)/buttons/secondaryButton";
import AnnouncementCard from "@/app/(components)/cards/AnnouncementCard";
import DatePicker, { DatePickerProps } from "antd/es/date-picker";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import AnnouncementModal from "@/app/(components)/modals/NewAnnouncement";
import { useState } from "react";
import { toast } from "react-toastify";
interface AnnouncmentProps {
  announcements: {
    id: number;
    subject: String;
    announcementbody: String;
    createdAt: any;
  }[];
}
const Announcements = ({ announcements }: AnnouncmentProps) => {
  const onChange: DatePickerProps["onChange"] = async (date, dateString) => {
    console.log(date, dateString);
  };
  const [openNewAnnouncement, handleOpenNewAnnouncement] = useState(false);
  const [openEditAnnouncement, handleOpenEditAnnouncement] = useState(false);
  const [announcementId, setAnnouncementId] = useState(0);
  const [activeAnnouncements, setActiveAnnouncements] = useState(announcements);
  const [AnouncementTitle, setAnnouncementTitle] = useState("");
  const [Anouncementbody, setAnnouncementBody] = useState("");
  const handleAnnouncementEdit = async (id: number) => {
    setAnnouncementId(id);
    const response = await fetch(`/api/announcements/${id}`);
    const data = await response.json();
    if (data.status != 200) {
      toast.error("Could not fetch this announcement");
    }
    setAnnouncementTitle(data.announcement?.subject);
    setAnnouncementBody(data.announcement?.announcementbody);
    handleOpenEditAnnouncement(true);
  };
  return (
    <div className="w-full flex flex-col gap-2 mt-3">
      <div className="my-3  flex justify-between">
        <div className="flex gap-2 w-full">
          <DatePicker
            onChange={onChange}
            className="bg-white outline-none text-gray-900 text-sm h-fit rounded-lg block w-full p-2 md:p-2 placeholder:text-sm border border-gray-400"
          />
          <FilterButton
            className="w-full text-sm"
            icon={<MdOutlineSettingsInputComposite />}
            btnText="Filter by"
          />
        </div>
        <div className="w-full flex justify-end">
          <ButtonIconified
            customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white border border-blue-700 mt-1 md:mt-0"
            label={"Create New"}
            icon={<FaPlus />}
            Click={() => handleOpenNewAnnouncement(true)}
          />
        </div>
      </div>
      {activeAnnouncements.map((announcement) => (
        <AnnouncementCard
          haveActions={true}
          key={announcement.id}
          title={announcement.subject}
          body={announcement.announcementbody}
          announcementId={announcement.id}
          time={announcement.createdAt}
          handleAnnouncementEdit={handleAnnouncementEdit}
        />
      ))}
      <AnnouncementModal
        open={openNewAnnouncement}
        handleOpen={handleOpenNewAnnouncement}
      />
      <AnnouncementModal
        open={openEditAnnouncement}
        handleOpen={handleOpenEditAnnouncement}
        edit={true}
        announcementId={announcementId}
        subject={AnouncementTitle}
        title="Edit announcement"
        contents={Anouncementbody}
      />
    </div>
  );
};
export default Announcements;
