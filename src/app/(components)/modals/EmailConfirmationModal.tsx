"use client";
import { Modal } from "antd";
import { FaEnvelopeOpenText } from "react-icons/fa";
import Button from "../buttons/primaryBtn";
import { ModalProps } from "./SuccessModal";
export const EmailConfirmationModal = ({ open, handleOpen }: ModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleOpen(false)}
      width={400}
      footer={null}
      centered
    >
      <div className="w-full flex justify-center items-center flex-col gap-6 p-6">
        <span className="text-6xl text-blue-600">
          <FaEnvelopeOpenText />
        </span>
        <div className="flex flex-col gap-1 w-full text-center">
          <p className="font-medium text-black text-base">
            Verify your email address
          </p>
          <p className="text-sm text-black opacity-90">{`We’ve sent a verification link to your email.`}</p>
        </div>
        <div className="flex flex-col gap-1 w-full text-center">
          <p className="text-xs text-black opacity-90">{`Didn’t get an email?`}</p>
          <div className="w-12/12 flex items-center  justify-center">
            <Button
              label="Resend verification link"
              customStyle="bg-blue-700 py-1 hover:bg-blue-300 text-white border border-blue-700 mt-1 md:mt-0"
              Click={() => {}}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
