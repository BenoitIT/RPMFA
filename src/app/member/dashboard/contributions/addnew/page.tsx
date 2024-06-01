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
  const [recieptNumber, setRecieptNumber] = useState("");
  const handleUpdateUser = async (e: any) => {
    e?.preventDefault();
    const response = await fetch(`/api/contributions/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recieptNumber: recieptNumber,
        image: image,
      }),
    });
    const data = await response.json();
    if (data.status == 200) {
      toast.success("Contribution info. are submitted successfully.");
      router.refresh();
    }
  };
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
        <Link
          href="/member/dashboard/contributions"
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Contributions
        </Link>
        <PiGreaterThanLight className="mt-[3px]" />
        <p className="text-blue-700 hover:cursor-pointer">
          Add new contribution
        </p>
      </h3>
      <div className="w-full flex justify-center items-center min-h-[80vh] flex-col">
        <p className="text-xl font-medium text-blue-1 mt-3">Add New Contribution</p>
        <div className=" w-full bg-white rounded-lg shadow dark:border my-3 sm:max-w-lg xl:p-0 border border-blue-100 m-3">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleUpdateUser}
            >
              <PrimaryInput
                label="Deposit Receipt Number"
                type="text"
                name="phone"
                value=""
                placeholder="Enter your deposit receipt Number"
                changeHandler={(e) => setRecieptNumber(e.target.value)}
              />
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Reciept Image
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
                  toast.success("Reciept image is uploaded");
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
                          className="h-[150px] w-[449px] bg-gray-1 flex flex-col justify-center items-center"
                        >
                          <p className="text-sm opacity-85">
                            Upload a reciept here
                          </p>
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
                label="Add Contribution"
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
