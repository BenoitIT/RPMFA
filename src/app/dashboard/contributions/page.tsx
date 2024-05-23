"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import Contributions from "../(components)/ContentsContainers/contributions";

const Page = () => {
  return (
    <div className="mt-4 w-full">
      <h3 className="text-gray-600 text-sm flex gap-1">
        Home
        <PiGreaterThanLight className="mt-1" />
        Contributions
      </h3>
      <Contributions />
    </div>
  );
};

export default Page;
