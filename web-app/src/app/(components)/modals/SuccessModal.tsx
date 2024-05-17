"use client";
import { Modal } from "antd";
import { HiCheckBadge } from "react-icons/hi2";
import Button from "../buttons/primaryBtn";
export interface ModalProps{
    open:boolean;
    handleOpen:(val:boolean)=>void;
}
export const SuccessModal = ({open,handleOpen}:ModalProps) => {
  return (
    <Modal open={open} onCancel={() =>handleOpen(false)} width={400} footer={null} centered>
      <div className="w-full flex justify-center items-center flex-col gap-6 p-6">
        <span className="text-8xl text-green-300">
          <HiCheckBadge />
        </span>

        <div className="flex flex-col gap-2 w-full text-center">
          <p className="font-medium text-black text-base">Success!</p>
          <p className="text-sm text-black opacity-90 w-11/12">
            Your email has been successfully verified. Click on the button below
            to continue.
          </p>
          <div className="w-12/12 flex items-center  justify-center">
            <Button
              label="Continue"
              customStyle="bg-blue-700 hover:bg-blue-300 text-white border border-blue-700 mt-1 md:mt-0 w-40"
              Click={() => {}}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
