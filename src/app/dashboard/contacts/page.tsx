"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import Link from "next/link";
import Messages from "../(components)/ContentsContainers/messages";

const Page = async() => {
  const response = await fetch(
    `${process.env.NEXT_APP_URL}/api/contact`,
    { cache: "no-store" }
  );
  const data = await response.json();
  if(data.status==200){
  const messages=data.data;
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
        <p className="text-blue-700 hover:cursor-pointer">Contacts</p>
      </h3>
      <Messages messages={messages}/>
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
