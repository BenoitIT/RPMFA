"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import Announcements from "../(components)/ContentsContainers/anouncements";


const Page = () => {
  return (
    <div className="mt-4 w-full">
      <h3 className="text-gray-600 text-sm flex gap-1">
        Home
        <PiGreaterThanLight className="mt-1" />
        Announcements
      </h3>
      <Announcements/>
    </div>
  );
};

export default Page;
