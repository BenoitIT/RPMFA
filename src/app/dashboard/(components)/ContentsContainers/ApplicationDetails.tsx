"use client";
import Button from "@/app/(components)/buttons/primaryBtn";
import { SuccessModal } from "@/app/(components)/modals/SuccessModal";
import { Alert } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaFile } from "react-icons/fa6";
import Link from "next/link";
import { ApplicationRejectionModal } from "@/app/(components)/modals/rejectionModal";
import FeedbackModal from "@/app/(components)/modals/feedbackModal";
import { useSession } from "next-auth/react";
const ApplicationDetails = ({ application, category }: any) => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const session: any = useSession();
  const [openRejectModal, setRejectModal] = useState(false);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const router = useRouter();
  const handleOpenRejectModal = () => {
    setRejectModal(true);
  };
  const handleFeedbackModal = () => {
    setOpenFeedbackModal(true);
  };
  const handleApproveApplication = async () => {
    const response = await fetch(`/api/${category}/${application?.id}`, {
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
        body: JSON.stringify({
          firstName: application?.user?.firstName,
          email: application?.user?.email,
        }),
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
            {application?.user?.firstName[0] +
              "" +
              application?.user?.lastName[0]}
          </div>
          <h1 className="font-medium text-blue-600 my-6 text-base capitalize">
            {application?.facilityName}
          </h1>
        </div>
        {session?.data?.user?.role == "admin" &&
        application.status == "pending" ? (
          <Button
            label="Feedback"
            customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white w-[130px] rounded font-medium"
            Click={handleFeedbackModal}
          />
        ) : (
          <div className="flex flex-col gap-1 text-black text-sm">
            <h3 className="font-semibold">Application Status</h3>
            <p
              className={` text-xs text-center rounded py-[5px] capitalize ${
                application.status?.toLowerCase() == "approved"
                  ? "text-blue-400 bg-green-100 font-medium"
                  : ""
              }${
                application.status?.toLowerCase() == "rejected"
                  ? "border-red-300 bg-red-400 text-white"
                  : ""
              } ${
                application.status?.toLowerCase().includes("pending")
                  ? "border-yellow-100 font-medium  text-yellow-600 bg-yellow-100"
                  : ""
              }`}
            >
              {application.status}
            </p>
          </div>
        )}
      </div>
      <div className="text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <AppField
          title="Category of Health Facility"
          decription={application?.facilityCategory}
        />
        <AppField
          title="Health Facility TIN Number"
          decription={application?.tinNumber}
        />
        <AppField
          title="Contact Person"
          decription={
            application?.user?.firstName.toUpperCase() +
            " " +
            application?.user?.lastName
          }
        />
        <AppField title="Email Address" decription={application?.user?.email} />
        <AppField
          title="Contact Person Title"
          decription={application?.user?.title}
        />
        <AppField
          title="Contact Person Email"
          decription={application?.user?.email}
        />
        <AppField title="Phone Number" decription={application?.user?.phone} />
        <AppField
          title="Contact Person Phone Number"
          decription={application?.user?.phone}
        />
      </div>
      <div className="flex flex-col gap-3 my-6">
        {application?.documents?.length > 0 ? (
          application?.documents?.map((document: string, index: number) => {
            const uniqueDocumentPart = document.split("/")[1];
            return (
              <Link
                href={`/dashboard/${category}/${application?.id}/${uniqueDocumentPart}`}
                key={index}
              >
                <div className="flex flex-row gap-3 p-2 w-full bg-blue-50 rounded text-blue-700 font-medium text-xs">
                  <FaFile className="text-lg" />
                  <span>document {index + 1}</span>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-sm">No documents uploaded</p>
        )}
      </div>
      {application?.status !== "rejected" &&
      session?.data?.user?.role == "admin" ? (
        ""
      ) : (
        <div className="text-sm">
          <AppField
            title="Reason for rejection"
            decription="Provide all necessary documents"
          />
        </div>
      )}
      {(application?.status == "pending" &&
        session?.data?.user?.role !== "admin") ||
      (application?.status == "rejected" &&
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
      {application?.status == "pending" &&
      session?.data?.user?.role == "admin" ? (
        <div className="flex flex-row gap-4 p-2 w-full">
          <Button
            label="Approve"
            customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white w-full rounded font-medium"
            Click={handleApproveApplication}
          />
          <Button
            label="Reject"
            customStyle="bg-red-100 py-2 hover:bg-red-300 text-red-800 w-full rounded font-medium"
            Click={handleOpenRejectModal}
          />
        </div>
      ) : application?.status == "approved" ? (
        <Alert
          message="Applicant approved! An email will be sent to notify them"
          type="success"
          showIcon
        />
      ) : application?.status == "approved" ? (
        <Alert
          message="Applicant rejected! An email has been sent to notify them"
          type="error"
          showIcon
        />
      ) : (
        ""
      )}
      <SuccessModal
        open={openSuccessModal}
        handleOpen={setOpenSuccessModal}
        title="Applicant Approved!"
        message="An email will has been sent to notify them"
        NextPath=""
      />
      <ApplicationRejectionModal
        open={openRejectModal}
        handleOpen={setRejectModal}
        appId={application?.id}
        applicantEmail={application?.user?.email}
        applicantName={application?.user?.firstName}
      />
      <FeedbackModal
        open={openFeedbackModal}
        handleOpen={setOpenFeedbackModal}
        userId={application?.user?.id}
        applicantEmail={application?.user?.email}
        applicantName={application?.user?.firstName}
      />
    </div>
  );
};
export default ApplicationDetails;

const AppField = ({ title, decription }: any) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-medium">{title}</h3>
      <p className="text-gray-600">{decription}</p>
    </div>
  );
};
