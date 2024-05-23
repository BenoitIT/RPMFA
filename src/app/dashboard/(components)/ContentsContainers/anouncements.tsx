import FilterButton from "@/app/(components)/buttons/FilterButton";
import ButtonIconified from "@/app/(components)/buttons/secondaryButton";
import AnnouncementCard from "@/app/(components)/cards/AnnouncementCard";
import DatePicker, { DatePickerProps } from "antd/es/date-picker";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const Announcements = () => {
  const onChange: DatePickerProps["onChange"] = async (date, dateString) => {
    "use server";
    console.log(date, dateString);
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
        <ButtonIconified customStyle="bg-blue-1 py-2 hover:bg-blue-300 text-white border border-blue-700 mt-1 md:mt-0" label={"Create New"} icon={<FaPlus />} Click={async()=>{"use server"}}/>
        </div>
      </div>
      <AnnouncementCard haveActions={true} />
      <AnnouncementCard haveActions={true} />
      <AnnouncementCard haveActions={true} />
      <AnnouncementCard haveActions={true} />
      <AnnouncementCard haveActions={true} />
    </div>
  );
};
export default Announcements;
