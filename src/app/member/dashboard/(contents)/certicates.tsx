"use client";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { Cloudinary } from "cloudinary-core";
interface certificate {
  memberships: any[];
}
interface certificateCard {
  name: number;
  certificateLink: string;
  onClick: (val: string) => void;
  currentPreview: string;
  onDownload: () => void;
}
const Certificates = ({ memberships }: certificate) => {
  const cld = new Cloudinary({ cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME });
  const [certificate, setCertificate] = useState("");
  useEffect(() => {
    setCertificate(memberships[0]?.membershipCertificate);
  }, [memberships[0]?.membershipCertificate]);
  const handleDownload =async () => {
    const imageUrl = cld.url(certificate, {
      width: 800,
      height: 600,
      quality: "auto",
      fetch_format: "auto",
    });
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const contentType = blob.type.split('/')[1]; 
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `certificate.${contentType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };
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
              onDownload={handleDownload}
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
  onDownload,
}: certificateCard) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`w-[200px] bg-blue-50 h-[140px] rounded flex justify-center items-center ${
          currentPreview == certificateLink ? "border-2" : ""
        } hover:border-2 border-blue-300 hover:cursor-pointer`}
        onClick={() => onClick(certificateLink)}
      >
        <MdOutlineFileDownload
          className=" text-blue-600 text-2xl"
          onClick={() => {
            onClick(certificateLink);
            onDownload();
          }}
        />
      </div>
      <h2 className="text-sm ml-2">Certificate {name}</h2>
    </div>
  );
};
// function getImage(
//   publicId: any,
//   arg1: { width: number; height: number; quality: number }
// ) {
//   throw new Error("Function not implemented.");
// }
