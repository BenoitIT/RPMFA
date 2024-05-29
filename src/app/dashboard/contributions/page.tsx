"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import Contributions from "../(components)/ContentsContainers/contributions";
import Link from "next/link";

const Page = () => {
  return (
    <div className="mt-4 w-full">
      <h3 className="text-gray-600 text-sm flex gap-1">
        <Link
          href="/dashboard"
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Home
        </Link>
        <PiGreaterThanLight className="mt-[3px]" />
        <p className="text-blue-700 hover:cursor-pointer">Contributions</p>
      </h3>
      <Contributions />
    </div>
  );
};

export default Page;
