"use client";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
interface certificate {
  memberships: any[];
}
interface certificateCard {
  name: number;
  certificateLink: string;
  onClick: (val: string) => void;
  currentPreview: string;
}
const Certificates = ({ memberships }: certificate) => {
  const [certificate, setCertificate] = useState("");
  useEffect(() => {
    setCertificate(memberships[0]?.membershipCertificate);
  }, [memberships[0]?.membershipCertificate]);
  if (memberships) {
    return (
      <div className="w-full flex flex-row gap-[4px] py-[3vh] px-[2vw] bg-white rounded min-h-[80vh]">
        <div className="w-fit grid grid-cols-1 gap-3">
          {memberships?.map((membership, index: number) => (
            <Certifcate
              name={index + 1}
              key={index}
              certificateLink={membership?.membershipCertificate}
              onClick={setCertificate}
              currentPreview={certificate}
            />
          ))}
        </div>
        <div className="w-fit border border-blue-200 h-[80vh] overflow-scroll ml-2">
          <CldImage
            src={certificate}
            alt="certificate"
            width={700}
            height={600}
            quality={100}
            className="w-full"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex justify-center items-center py-[3vh] px-[2vw] bg-white rounded min-h-[80vh]">
        <p>No membership certificate has been provided</p>
      </div>
    );
  }
};

export default Certificates;

const Certifcate = ({
  name,
  certificateLink,
  currentPreview,
  onClick,
}: certificateCard) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`w-[200px] bg-blue-50 h-[140px] rounded flex justify-center items-center ${
          currentPreview == certificateLink ? "border-2" : ""
        } hover:border-2 border-blue-300 hover:cursor-pointer`}
        onClick={() => onClick(certificateLink)}
      >
        <MdOutlineFileDownload className=" text-blue-600 text-2xl" />
      </div>
      <h2 className="text-sm ml-2">Certificate {name}</h2>
    </div>
  );
};
