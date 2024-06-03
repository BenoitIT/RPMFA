"use client";
import { PiGreaterThanLight } from "react-icons/pi";
import CustomBtn from "@/app/(components)/buttons/primaryBtn";
import Link from "next/link";
import { PrimaryInput } from "@/app/(components)/inputs/Inputs";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Alert, Button } from "antd";
import { BsUpload } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { SecondarySelectorInput } from "@/app/(components)/inputs/SelectorInputs";

const Page = () => {
  const session: any = useSession();
  const router = useRouter();
  const userId = session?.data?.user?.id;
  const [image, setImage] = useState<any>([]);
  const [facilties, setFacilities] = useState<any[]>([]);
  const [worning, setWorning] = useState("");
  const [loading, setLoading] = useState(false);
  const { editId }: any = useParams();
  const [formValues, setFormValues] = useState({
    recieptAmount: "",
    faciltyId: 0,
    recieptNumber: "",
    image: [],
  });
  useEffect(() => {
    const fetchUserFacilities = async () => {
      const response = await fetch(`/api/applications/user/${userId}`, {
        cache: "no-store",
      });
      const data = await response.json();
      if (data.status == 200) {
        const facilities = data?.applications.map((facility: any) => {
          return { id: facility.id, name: facility.facilityName };
        });
        const selectableData = [
          { id: 0, name: "Select facility name" },
          ...facilities,
        ];
        setFacilities(selectableData);
      }
    };
    fetchUserFacilities();
  }, [userId]);
  useEffect(() => {
    const fetchContributionInfo = async () => {
      const response = await fetch(`/api/contribution/${editId}`, {
        cache: "no-store",
      });
      const responseBody = await response.json();
      if (responseBody?.status == 200 || !responseBody.contribution == null) {
        const contribution = responseBody.contribution;
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          recieptNumber: contribution.depositRecieptNumber,
          recieptAmount: contribution.contributionAmount,
        }));
        setImage(contribution.depositReciept);
      }
    };
    fetchContributionInfo();
  }, [editId]);
  const handleSendContribution = async (e: any) => {
    e?.preventDefault();
    try {
      setLoading(true);
      if (isNaN(Number(formValues.recieptAmount))) {
        setWorning("Amount should be a valid number!");
      } else if (formValues.recieptNumber == "") {
        setWorning("Receipt number should not be empty!");
      } else if (image.length < 1) {
        setWorning("Reciept image should be selected");
      } else {
        setWorning("");
        const payload = {
          depositRecieptNumber: formValues.recieptNumber,
          depositReciept: image,
          contributionAmount: Number(formValues.recieptAmount),
        };
        const response = await fetch(`/api/contribution/edit/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data.status == 200) {
          toast.success(data?.message);
          router.refresh();
          setLoading(false);
        } else if (data[0]?.message) {
          toast.success(data[0]?.message);
          setLoading(false);
        } else {
          toast.error(data.message);
          setLoading(false);
        }
      }
    } catch (err) {
      toast.error("Unexpected error occurs");
      setLoading(false);
    }
  };
  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
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
        <p className="text-blue-700 hover:cursor-pointer">Edit contribution</p>
      </h3>
      <div className="w-full flex justify-center items-center min-h-[80vh] flex-col">
        <p className="text-xl font-medium text-blue-1 mt-3">
          Edit Contribution Info.
        </p>
        {worning.length > 0 && (
          <Alert message={worning} type="warning" showIcon closable />
        )}
        <div className=" w-full bg-white rounded-lg shadow dark:border my-3 sm:max-w-lg xl:p-0 border border-blue-100 m-3">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSendContribution}
            >
              <PrimaryInput
                label="Contribution Amount"
                type="text"
                name="recieptAmount"
                value={formValues.recieptAmount}
                placeholder="Enter your contribution amount"
                changeHandler={handleInputChange}
              />
              <PrimaryInput
                label="Deposit Receipt Number"
                type="text"
                name="recieptNumber"
                value={formValues.recieptNumber}
                placeholder="Enter your deposit receipt Number"
                changeHandler={handleInputChange}
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
                  setImage((prev: any[]) => [...prev, result?.info?.public_id]);
                }}
              >
                {({ open }) => {
                  return (
                    <>
                      {image.length < 1 ? (
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
                            src={image[0]}
                            alt="Tap to upload image"
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
                label={loading ? "Editing..." : "Edit Contribution Info."}
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
