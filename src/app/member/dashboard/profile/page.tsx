"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import Link from "next/link";
import ProfileInfo from "@/app/dashboard/(components)/ContentsContainers/profile";
import { auth } from "@/auth";


const Page = async() => {
  const session: any = await auth();
  const id = session?.user?.id;
  const response=await fetch(`${process.env.NEXT_APP_URL}/api/users/${id}`, {
    cache: "no-store",
  });
  const data=await response.json();
  if(data.status==200){
  const user=data.user
  return (
    <div className="mt-4 w-full">
      <h3 className="text-gray-600 text-sm flex gap-1">
        <Link
          href="/member/dashboard"
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Home
        </Link>
        <PiGreaterThanLight className="mt-[3px]" />
        <p className="text-blue-700 hover:cursor-pointer">Profile</p>
      </h3>
      <ProfileInfo user={user}/>
    </div>
  );
}
};

export default Page;
