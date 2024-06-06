"use client";

import { Modal } from "antd";
import { PrimaryInput } from "../inputs/Inputs";
import Button from "../buttons/primaryBtn";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface AnnouncementProps {
  title?: string;
  open: boolean;
  handleOpen: (val: boolean) => void;
  announcementId?: Number | string;
  subject?: string;
  contents?: string;
  edit?: boolean;
}
const AnnouncementModal = ({
  title,
  open,
  handleOpen,
  announcementId,
  subject,
  contents,
  edit,
}: AnnouncementProps) => {
  const [subjectTxt, setSubject] = useState(subject);
  const [bodyTxt, setBodyTxt] = useState(contents);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setSubject(subject);
    setBodyTxt(contents);
  }, [subject, contents]);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (subjectTxt == "") {
        toast.error("Subject must exist");
        setLoading(false);
      } else if (bodyTxt == "") {
        toast.error("Announcement contents must exist");
        setLoading(false);
      } else if (!edit) {
        const response = await fetch(`/api/announcements`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: subjectTxt,
            announcementbody: bodyTxt,
          }),
        });
        const responseData = await response.json();
        if (responseData.status === 201) {
          toast.success(responseData.message);
          setSubject("");
          setBodyTxt("");
          setLoading(false);
          router.refresh();
          handleOpen(false);
        } else if (responseData.status === 400) {
          toast.error(responseData.message);
          setLoading(false);
        } else {
          toast.error(responseData[0]?.path[0]+' '+responseData[0].message);
          setLoading(false);
        }
      } else {
        const response = await fetch(`/api/announcements/${announcementId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: subjectTxt,
            announcementbody: bodyTxt,
          }),
        });
        const responseData = await response.json();
        if (responseData.status === 200) {
          toast.success(responseData.message);
          setSubject("");
          setBodyTxt("");
          setLoading(false);
          router.refresh();
          handleOpen(false);
        } else if (responseData.status === 400) {
          toast.error(responseData.message);
          setLoading(false);
        } else {
          toast.error(responseData[0]?.path[0]+' '+responseData[0].message);
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error("Some error occured");
      setLoading(false);
    }
  };

  return (
    <Modal
      title={title ? title : "Create New Announcement"}
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
          placeholder="Enter subject here"
          changeHandler={(e) => setSubject(e.target.value)}
        />
        <label
          htmlFor="announcementBody"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Body
        </label>
        <textarea
          cols={60}
          value={bodyTxt}
          className="bg-gray-1 outline-none text-gray-900 sm:text-sm rounded-lg block w-full h-[250px] p-2 md:p-2.5 placeholder:text-sm"
          name="announcementBody"
          onChange={(e) => setBodyTxt(e.target.value)}
        ></textarea>
        <div className="flex flex-row gap-4 p-2 w-full">
          <Button
            label="Cancel"
            customStyle="bg-red-200 py-2 hover:bg-red-400 text-red-800 w-full rounded font-medium"
            Click={() => {
              handleOpen(false);
              setSubject("");
              setBodyTxt("");
            }}
          />
          <Button
            label={
              loading ? "Saving..." : edit ? "Save and Repost" : "Save and Post"
            }
            customStyle="bg-blue-1 py-2 hover:bg-blue-800 text-white w-full rounded font-medium"
            Click={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};
export default AnnouncementModal;
