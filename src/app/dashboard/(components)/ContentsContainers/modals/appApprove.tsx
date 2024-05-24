import Button from "@/app/(components)/buttons/primaryBtn";
import { Modal } from "antd";
import { FaFile } from "react-icons/fa6";

const ApplicationApproveModal = () => {
  return (
    <Modal
      open={true}
      onCancel={() => {}}
      width={500}
      title="Application Details"
      footer={null}
      centered
    >
      <div className="w-full my-3">
        <div className="h-16 w-16 rounded-full bg-blue-200"></div>
        <h1 className="font-medium text-blue-600 my-4 text-base">
          Amaris Medical Clinic
        </h1>
        <div className="text-sm grid grid-cols-2 gap-2">
          <AppField
            title="Category of Health Facility"
            decription="General Clinic"
          />
          <AppField title="Contact Person" decription="Angelo Igitego" />
          <AppField
            title="Email Address"
            decription="angelo.igitego@gmail.com"
          />
          <AppField
            title="Contact Person Email"
            decription="angelo.igitego@gmail.com"
          />
          <AppField title="Phone Number" decription="+250 000 000 000" />
          <AppField
            title="Contact Person Phone Number"
            decription="+250 000 000 000"
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <div className="flex flex-row gap-3 p-2 w-full bg-blue-100 rounded text-blue-700">
            <FaFile className="text-lg" />
            <span>Document</span>
          </div>
          <div className="flex flex-row gap-3 p-2 w-full bg-blue-100  rounded text-blue-700">
            <FaFile className="text-lg" />
            <span>Document</span>
          </div>
        </div>
        <div className="flex flex-row gap-3 p-2 w-full">
        <Button
            label="Reject"
            customStyle="bg-red-100 py-2 hover:bg-red-300 text-red-800 w-full rounded font-medium"
            Click={()=>{}}
          />
          <Button
            label="Approve"
            customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white w-full rounded font-medium"
            Click={()=>{}}
          />
      </div>
      </div>
    </Modal>
  );
};
export default ApplicationApproveModal;

const AppField = ({ title, decription }: any) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-medium">{title}</h3>
      <p className="text-gray-600">{decription}</p>
    </div>
  );
};
