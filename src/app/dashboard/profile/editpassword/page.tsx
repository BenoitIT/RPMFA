"use client";
import { PiGreaterThanLight } from "react-icons/pi";
import CustomBtn from "@/app/(components)/buttons/primaryBtn";
import Link from "next/link";
import { PrimaryInput } from "@/app/(components)/inputs/Inputs";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { BsUpload } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const session: any = useSession();
  const router = useRouter();
  const userId = session?.data?.user?.id;
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const handleUpdateUserPassword = async (e: any) => {
    e?.preventDefault();
    const response = await fetch(`/api/users/creds/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.status == 200) {
      toast.success("Password is updated successfully");
      router.refresh();
    }
  };
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
        <Link
          href="/dashboard/profile"
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Profile
        </Link>
        <PiGreaterThanLight className="mt-[3px]" />
        <p className="text-blue-700 hover:cursor-pointer">Edit Password</p>
      </h3>
      <div className="w-full flex justify-center items-center min-h-[80vh]">
        <div className=" w-full bg-white rounded-lg shadow dark:border my-3 sm:max-w-lg xl:p-0 border border-blue-100 m-3">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleUpdateUserPassword}
            >
              <PrimaryInput
                label="Current Password"
                type="password"
                value={currentPassword}
                name="CurrentPassword"
                placeholder="Enter your current password"
                changeHandler={(e) => setCurrentPassword(e.target.value)}
              />
              <PrimaryInput
                label="New Password"
                type="password"
                value={password}
                name="NewPassword"
                placeholder="Enter new password"
                changeHandler={(e) => setPassword(e.target.value)}
              />
              <CustomBtn
                label="Update Password"
                customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white w-full rounded font-medium"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
