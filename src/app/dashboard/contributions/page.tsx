"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import Contributions from "../(components)/ContentsContainers/contributions";
import Link from "next/link";

const Page = async() => {
  const response = await fetch(
    `${process.env.NEXT_APP_URL}/api/contribution`,
    { cache: "no-store" }
  );
  const data = await response.json();
  if(data.status==200){
  const contributions=data.contributions;
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
      <Contributions contributions={contributions} />
    </div>
  );
}else{
  <div className="bg-blue-50 pt-6 -mx-4 mt-2 flex justify-center items-center h-[85vh]">
  <div className="text-black flex justify-center items-center bg-white rounded p-[20vw]">
    Something went wrong while processing contributions!
  </div>
</div>
}
};

export default Page;
