"use client";
import Button from "@/app/(components)/buttons/primaryBtn";
import { useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage: any;
}
const ProfileInfo = ({ user }: User | any) => {
  const session: any = useSession();
  return (
    <div className="flex bg-white justify-center items-center w-full min-h-[80vh] flex-col gap-3">
      <div className="border border-blue-100 shadow rounded w-[280px] md:w-[380px] p-6">
        <div className="w-full flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex  text-xl justify-center items-center uppercase font-bold text-blue-950">
            {user?.profileImage ? (
              <CldImage
                src={user?.profileImage}
                alt="image"
                width={150}
                height={150}
                quality={100}
              />
            ) : (
              user?.firstName[0] + " " + user?.lastName[0]
            )}
          </div>
          <h1 className="font-medium text-blue-600 my-6 text-base capitalize">
            {user?.firstName + " " + user?.lastName}
          </h1>
          <AppField title="Email Address" decription={user?.email} />
          <AppField title="Phone Number" decription={user?.phone} />
        </div>
      </div>
      {session?.data?.user?.role == "admin" ? (
        <Link href="/dashboard/profile/edit">
          <Button
            label="Edit Profile"
            customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white w-[280px] md:w-[380px] rounded font-medium"
          />
        </Link>
      ) : (
        <Link href="/member/dashboard/profile/edit">
          <Button
            label="Edit Profile"
            customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white w-[280px] md:w-[380px] rounded font-medium"
          />
        </Link>
      )}
    </div>
  );
};
export default ProfileInfo;
const AppField = ({ title, decription }: any) => {
  return (
    <div className="flex flex-col gap-1 text-center w-full text-sm mb-3">
      <h3 className="font-medium">{title}</h3>
      <p className="text-gray-600">{decription}</p>
    </div>
  );
};
