"use client";
import { CldImage } from "next-cloudinary";
const DocumentView = ({ document }: any) => {
  return (
    <div className="w-full  max-h-[95vh] overflow-scroll">
      <CldImage
        src={`rpmfa documents/${document}`}
        alt="document"
        width={800}
        height={1000}
        quality={100}
      />
    </div>
  );
};
export default DocumentView;
