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
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`, {
        cache: "no-store",
      });
      const data = await response.json();
      const user = data.user;
      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setPhoneNumber(user?.phone);
      setImage(user?.profileImage);
    };
    fetchUser();
  }, [userId]);
  const handleUpdateUser = async (e:any) => {
    e?.preventDefault();
    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
        image: image,
      }),
    });
    const data = await response.json();
    if (data.status == 200) {
      toast.success("Profile info. is updated successfully");
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
        <p className="text-blue-700 hover:cursor-pointer">Edit Profile</p>
      </h3>
      <div className="w-full flex justify-center items-center min-h-[80vh]">
        <div className=" w-full bg-white rounded-lg shadow dark:border my-3 sm:max-w-lg xl:p-0 border border-blue-100 m-3">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleUpdateUser}>
              <PrimaryInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                placeholder="Enter your first name here"
                changeHandler={(e) => setFirstName(e.target.value)}
              />
              <PrimaryInput
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                placeholder="Enter your last name here"
                changeHandler={(e) => setLastName(e.target.value)}
              />
              <PrimaryInput
                label="Telephone"
                type="text"
                name="phone"
                value={phoneNumber}
                placeholder="Enter your phone number here"
                changeHandler={(e) => setPhoneNumber(e.target.value)}
              />
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Image
              </label>
              <CldUploadWidget
                uploadPreset="ny2jj7zl"
                options={{
                  sources: ["local"],
                  cropping: false,
                  multiple: false,
                  showAdvancedOptions: false,
                  defaultSource: "local",
                  styles: {
                    palette: {
                      action: "#06476E",
                    },
                  },
                }}
                onUpload={(result: any, widget) => {
                  toast.success("Image is uploaded");
                  setImage(result?.info?.public_id);
                }}
              >
                {({ open }) => {
                  return (
                    <>
                      {!image ? (
                        <Button
                          icon={<BsUpload />}
                          onClick={() => open()}
                          className="h-[200px] w-[449px] bg-green-100 flex flex-col justify-center items-center"
                        >
                          <p className="text-sm opacity-85">Upload file here</p>
                        </Button>
                      ) : (
                        <div className="w-full flex items-center">
                          <CldImage
                            src={image}
                            alt="document"
                            width={200}
                            height={300}
                            quality={100}
                            onClick={() => open()}
                          />
                        </div>
                      )}
                    </>
                  );
                }}
              </CldUploadWidget>
              <CustomBtn
                label="Update"
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
