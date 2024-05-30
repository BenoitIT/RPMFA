"use client";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import Button from "../buttons/primaryBtn";
import { useState } from "react";
import { toast } from "react-toastify";

interface ModalProps {
  open: boolean;
  handleOpen: (val: boolean) => void;
  appId: Number;
  applicantEmail: string;
  applicantName: string;
}
export const ApplicationRejectionModal = ({
  open,
  handleOpen,
  appId,
  applicantEmail,
  applicantName,
}: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleRejection = async () => {
    try {
      setLoading(true);
      if (message == "") {
        toast.error("Provide reason for rejection!");
        setLoading(false);
      } else {
        const response = await fetch(`/api/applications/reject/${appId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status == 200) {
          setLoading(false);
          await fetch("/api/emails/rejection", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: applicantName,
              email: applicantEmail,
              message: message,
            }),
          });
          handleOpen(false);
          router.refresh();
        } else {
          toast.error("Unexpected error occurs");
        }
      }
    } catch (err) {
      toast.error("Unexpected error occurs");
    }
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleOpen(false)}
      width={400}
      footer={null}
      centered
    >
      <div className="w-full flex justify-center items-center flex-col gap-6 p-6">
        <span className="text-xl text-white bg-red-400 rounded-full h-16 w-16 flex justify-center items-center ">
          <ImCross />
        </span>

        <div className="flex flex-col gap-2 w-full text-center">
          <p className="font-medium text-black text-base">
            Applicant Rejected!
          </p>
          <p className="text-sm text-black opacity-90 w-11/12 mx-auto text-center">
            An email will be sent to notify them
          </p>
          <label
            htmlFor="message"
            className="block mb-2 mr-4 text-sm font-medium text-gray-900"
          >
            Rejection Message
          </label>
          <textarea
            cols={30}
            value={message}
            className="bg-gray-1 outline-none text-gray-900 sm:text-sm rounded-lg block w-full h-[100px] p-2 md:p-2.5 placeholder:text-sm"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="w-12/12 flex items-center  justify-center">
            <Button
              label={loading ? "Rejecting..." : "Continue"}
              customStyle="bg-blue-700 py-1 hover:bg-blue-800 text-white border border-blue-700 mt-1 md:mt-0 w-40"
              Click={handleRejection}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
