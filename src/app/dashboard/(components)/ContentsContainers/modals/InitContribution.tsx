import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
interface ModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}
const InitializeAnnualContribs = ({ open, setOpen }: ModalProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const handleInitialize = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/contribution/initializeContribution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status == 200) {
        toast.success(data?.message);
        setLoading(false);
        router.refresh();
      }
    } catch (err) {
      toast.error("Unexpected error occurs");
      setLoading(false);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={500}
      title={`Initialize ${currentYear}'s contributions`}
      footer={null}
      centered
    >
      <div className="w-full my-4">
        <div className="h-fit w-full rounded border border-gray-300 text-sm text-black p-3 flex flex-col gap-2 leading-5 shadow mt-3">
          <ol className="list-decimal px-2 flex flex-col gap-2">
            <li>
              By clicking continue button, all members will get an email to
              remind them to pay contribution fees.
            </li>
            <li>
              By clicking continue button, all members will be intructed to pay{" "}
              {currentYear} - contribution as a debit
            </li>
            <li>
              By clicking continue button, will help you make sure that all
              members have the same contribtion updates. and members who have
              debits will be increased by {currentYear} amount
            </li>
          </ol>
        </div>
        <div className="w-full flex justify-center mt-3">
          <button
            className="bg-blue-1 py-2 hover:bg-blue-800 text-white w-full rounded-md font-nomal disabled:cursor-not-allowed disabled:opacity-40 text-sm"
            onClick={handleInitialize}
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default InitializeAnnualContribs;
