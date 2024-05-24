"use server";
import Allmembers from "../(components)/ContentsContainers/allmembers";
import { PiGreaterThanLight } from "react-icons/pi";

const Page = () => {
  return (
    <div className="mt-4 w-full">
      <h3 className="text-gray-600 text-sm flex gap-1">
        Home
        <PiGreaterThanLight className="mt-1" />
        Members
      </h3>
      <Allmembers />
    </div>
  );
};

export default Page;
