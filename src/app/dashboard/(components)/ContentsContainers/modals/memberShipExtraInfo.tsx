"use client";
import Button from "@/app/(components)/buttons/primaryBtn";
import CheckBox from "@/app/(components)/checkboxes/checkBox";
import { DatePicker, DatePickerProps, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
interface Modal {
  open: boolean;
  id: number | string;
  setOpen: (val: boolean) => void;
}
const MemberShipExtraInfo = ({ setOpen, open, id }: Modal) => {
  const [isNew, setIsNew] = useState(false);
  const [hasExisted, setHasExisted] = useState(false);
  const router=useRouter()
  const [DateValue, setDateValue] = useState("");
  const now = new Date().toISOString();
  const onOk = (value: DatePickerProps["value"]) => {};
  const ValidateContribution = async () => {
    try {
      let payload: any;
      if (hasExisted) {
        payload = {
          joinedAt: DateValue,
        };
      } else {
        payload = {
          joinedAt: now,
        };
      }
      if (hasExisted && DateValue == "") {
        toast.error("Select the latest contribution date");
      } else {
        const response = await fetch(`/api/member/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data.status == 200) {
          toast.success(data.message);
          router.refresh();
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error("unexpected error occurs!");
    }
  };
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      title="Membership Extra Info."
      footer={null}
      centered
    >
      <div className="w-full my-4">
        <div className="h-fit w-full rounded border border-gray-300 text-sm text-black p-2 flex flex-col gap-2 leading-5 text-center shadow">
          <li className="list-disc">
            Gathering the latest contribution date enables the identification of
            members who may have outstanding contributions for a specific year.
          </li>
          <li className="list-disc">
            By capturing the current date as the contribution date for new
            members joining this year, you will ensure they start with a clean
            record.
          </li>
          <li className="list-disc">
            This eliminates any confusion for future misunderstandings regarding
            unpaid contributions.
          </li>
          <li className="list-disc">
            This allows for efficient monitoring of membership eligibility and
            simplifies calculations related to future contributions
          </li>
        </div>
        <div className="h-fit  w-full rounded border border-gray-300 text-sm text-black p-2 flex flex-col gap-2 leading-5 shadow mt-4">
          <p className="text-sm text-blue-800 font-medium ml-2">
            Confirm the following
          </p>
          <div className="flex gap-4">
            <CheckBox
              checked={hasExisted}
              onChange={() => {
                setHasExisted(!hasExisted);
                setIsNew(false);
              }}
            />
            <p className="mt-2">The member has existed for some years</p>
          </div>
          <div
            className={
              hasExisted
                ? "flex flex-col gap-2 px-2 transition-transform pb-2"
                : "hidden"
            }
          >
            <p>Select the latest contribution date</p>
            <DatePicker
              onChange={(value: any, dateString) => {
                const datee = new Date(value).toISOString();
                setDateValue(datee);
              }}
              onOk={onOk}
            />
          </div>
          <div className={!hasExisted ? "flex gap-4" : "hidden"}>
            <CheckBox
              checked={isNew}
              onChange={() => {
                setHasExisted(false);
                setIsNew(!isNew);
              }}
            />
            <p className="mt-2">The member has joined this year</p>
          </div>
        </div>
        <div className="w-full  flex justify-end pt-3">
          <Button
            label={"Save and Confirm"}
            customStyle={
              "bg-blue-1 py-2 hover:bg-blue-800 text-white w-fit rounded font-semibold"
            }
            Click={ValidateContribution}
          />
        </div>
      </div>
    </Modal>
  );
};
export default MemberShipExtraInfo;
