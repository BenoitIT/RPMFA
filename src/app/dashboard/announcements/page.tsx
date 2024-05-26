"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import Announcements from "../(components)/ContentsContainers/anouncements";


const Page =async() => {
    const response = await fetch(`${process.env.NEXT_APP_URL}/api/announcements`, {
      cache: "no-store",
    });
    const data = await response.json();
    if(data.status==200){
  return (
    <div className="mt-4 w-full">
      <h3 className="text-gray-600 text-sm flex gap-1">
        Home
        <PiGreaterThanLight className="mt-1" />
        Announcements
      </h3>
      <Announcements announcements={data.announcements}/>
    </div>
  );
};
}

export default Page;
