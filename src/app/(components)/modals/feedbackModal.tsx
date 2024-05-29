"use client";

import { Modal } from "antd";
import { PrimaryInput } from "../inputs/Inputs";
import Button from "../buttons/primaryBtn";
import { useState } from "react";
import { toast } from "react-toastify";

interface feedbackModalProps {
  title?: string;
  open: boolean;
  handleOpen: (val: boolean) => void;
  userId?: Number | string;
}
const FeedbackModal = ({
  title,
  open,
  handleOpen,
  userId,
}: feedbackModalProps) => {
  const [subjectTxt, setSubject] = useState("");
  const [bodyTxt, setBodyTxt] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (subjectTxt == "") {
        toast.error("Subject must exist");
        setLoading(false);
      } else if (bodyTxt == "") {
        toast.error("Message contents must exist");
        setLoading(false);
      } else {
        toast.success("Feedback email is sent");
        setLoading(false);
        setSubject("");
        setBodyTxt("");
      }
    } catch (error) {
      toast.error("Some error occured");
      setLoading(false);
    }
  };

  return (
    <Modal
      title={title ? title : "Provide Feedback"}
      open={open}
      onCancel={() => {
        handleOpen(false);
      }}
      width={600}
      footer={null}
      centered
    >
      <div className="p-4 flex flex-col gap-3">
        <PrimaryInput
          label="Subject"
          type="text"
          value={subjectTxt}
          placeholder="Enter feedback title here"
          changeHandler={(e) => setSubject(e.target.value)}
        />
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Message
        </label>
        <textarea
          cols={60}
          value={bodyTxt}
          className="bg-gray-1 outline-none text-gray-900 sm:text-sm rounded-lg block w-full h-[180px] p-2 md:p-2.5 placeholder:text-sm"
          name="message"
          onChange={(e) => setBodyTxt(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-4 p-2 w-full">
          <Button
            label={loading ? "Sending..." : "Send feedback"}
            customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white w-[170px] rounded font-medium"
            Click={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};
export default FeedbackModal;
