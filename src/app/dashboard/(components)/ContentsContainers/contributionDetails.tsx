"use client";
import Button from "@/app/(components)/buttons/primaryBtn";
import { SuccessModal } from "@/app/(components)/modals/SuccessModal";
import { Alert } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaFile } from "react-icons/fa6";
import Link from "next/link";
import FeedbackModal from "@/app/(components)/modals/feedbackModal";
import { useSession } from "next-auth/react";
const ContributionDetails = ({ contribution, category }: any) => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const session: any = useSession();
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const router = useRouter();
  const handleFeedbackModal = () => {
    setOpenFeedbackModal(true);
  };
  const handleApproveContribution = async () => {
    const response = await fetch(`/api/${category}/${contribution?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data?.status == 200) {
      setOpenSuccessModal(true);
      await fetch("/api/emails/approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      setTimeout(() => {
        router.refresh();
      }, 3000);
    }
  };
  return (
    <div className="w-full bg-white p-10 rounded-sm">
      <div className="flex justify-between">
        <div className="w-fit flex flex-col">
          <div className="h-16 w-16 rounded-full bg-blue-200 flex  text-xl justify-center items-center uppercase font-bold text-blue-950">
            {contribution?.user?.firstName[0] +
              "" +
              contribution?.user?.lastName[0]}
          </div>
          <h1 className="font-medium text-blue-600 my-6 text-base capitalize">
            {contribution?.facility?.facilityName}
          </h1>
        </div>
        {session?.data?.user?.role == "admin" &&
        contribution.status == "pending" ? (
          <Button
            label="Feedback"
            customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white w-[130px] rounded font-medium"
            Click={handleFeedbackModal}
          />
        ) : (
          <div className="flex flex-col gap-1 text-black text-sm">
            <h3 className="font-semibold">Contribution Status</h3>
            <p
              className={` text-xs text-center rounded py-[5px] capitalize ${
                contribution.status?.toLowerCase() == "approved"
                  ? "text-blue-400 bg-green-100 font-medium"
                  : ""
              } ${
                contribution.status?.toLowerCase().includes("pending")
                  ? "border-yellow-100 font-medium  text-yellow-600 bg-yellow-100"
                  : ""
              }`}
            >
              {contribution.status}
            </p>
          </div>
        )}
      </div>
      <div className="text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <AppField
          title="Category of Health Facility"
          decription={contribution?.facility?.facilityCategory}
        />
        <AppField
          title="Health Facility TIN Number"
          decription={contribution?.facility?.tinNumber}
        />
        <AppField
          title="Contact Person"
          decription={
            contribution?.user?.firstName.toUpperCase() +
            " " +
            contribution?.user?.lastName
          }
        />
        <AppField
          title="Email Address"
          decription={contribution?.user?.email}
        />
        <AppField
          title="Contribution Amount"
          decription={contribution?.contributionAmount}
        />
        <AppField
          title="Contribution Reciept Number"
          decription={contribution?.depositRecieptNumber}
        />
        <AppField title="Phone Number" decription={contribution?.user?.phone} />
      </div>
      <div className="flex flex-col gap-3 my-6">
        <h1 className="text-sm font-medium">Contribution Reciepts</h1>
        {contribution?.depositReciept?.length > 0 ? (
          contribution?.depositReciept.map(
            (document: string, index: number) => {
              const uniqueDocumentPart = document.split("/")[1];
              return (
                <>
                  {session?.data?.user?.role == "admin" ? (
                    <Link
                      href={`/dashboard/contributions/${contribution?.id}/${uniqueDocumentPart}`}
                      key={index}
                    >
                      <div className="flex flex-row gap-3 p-2 w-full bg-blue-50 rounded text-blue-700 font-medium text-xs">
                        <FaFile className="text-lg" />
                        <span>Reciept {index + 1}</span>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      href={`/member/dashboard/${category}/${contribution?.id}/${uniqueDocumentPart}`}
                      key={index}
                    >
                      <div className="flex flex-row gap-3 p-2 w-full bg-blue-50 rounded text-blue-700 font-medium text-xs">
                        <FaFile className="text-lg" />
                        <span>Reciept {index + 1}</span>
                      </div>
                    </Link>
                  )}
                </>
              );
            }
          )
        ) : (
          <p className="text-sm">No reciept uploaded</p>
        )}
      </div>
      {contribution?.status == "rejected" &&
      session?.data?.user?.role !== "admin" ? (
        <div className="text-sm my-3">
          <AppField
            title="Reason for rejection"
            decription="Provide all necessary documents"
          />
        </div>
      ) : (
        ""
      )}
      {(contribution?.status == "pending" &&
        session?.data?.user?.role !== "admin") ||
      (contribution?.status == "rejected" &&
        session?.data?.user?.role !== "admin") ? (
        <div className="w-full flex justify-end">
          <Button
            label="Update Info"
            customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white w-[130px] rounded font-medium"
            Click={() => {}}
          />
        </div>
      ) : (
        ""
      )}
      {contribution?.status == "pending" &&
      session?.data?.user?.role == "admin" ? (
        <div className="flex flex-row justify-end  gap-4 p-2 w-full">
          <Button
            label="Approve Contribution"
            customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white w-fit rounded font-medium"
            Click={handleApproveContribution}
          />
        </div>
      ) : contribution?.status == "approved" ? (
        <Alert
          message="Contribution is approved! An email has been sent to notify "
          type="success"
          showIcon
        />
      ) : (
        ""
      )}
      <SuccessModal
        open={openSuccessModal}
        handleOpen={setOpenSuccessModal}
        title="Applicant Approved!"
        message="An email has been sent to notify"
        NextPath=""
      />
      <FeedbackModal
        open={openFeedbackModal}
        handleOpen={setOpenFeedbackModal}
        userId={contribution?.user?.id}
        applicantEmail={contribution?.user?.email}
        applicantName={contribution?.user?.firstName}
      />
    </div>
  );
};
export default ContributionDetails;

const AppField = ({ title, decription }: any) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-medium">{title}</h3>
      <p className="text-gray-600">{decription}</p>
    </div>
  );
};
