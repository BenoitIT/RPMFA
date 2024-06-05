"use client";
import CtmButton from "@/app/(components)/buttons/primaryBtn";
import { Modal } from "antd";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { Button } from "antd";
import { toast } from "react-toastify";
interface Modal {
  open: boolean;
  id: number | string;
  setOpen: (val: boolean) => void;
}
const MemberShipCertificateUploader = ({ setOpen, open, id }: Modal) => {
  const router = useRouter();
  const [certificate, setCertificate] = useState("");
  const [loading, setLoading] = useState(false);

  const deliverCertificate = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/certificate/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          certificate: certificate,
        }),
      });
      const data = await response.json();
      if (data.status == 200) {
        toast.success(data.message);
        router.refresh();
        setLoading(false);
      } else {
        toast.success(data.message);
        setLoading(false);
      }
    } catch (err) {}
  };
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={900}
      title="Membership Certificate"
      footer={null}
      centered
    >
      <div className="w-full my-4">
        <CldUploadWidget
          uploadPreset="emrtyzay"
          options={{
            sources: ["local"],
            cropping: false,
            multiple: false,
            showAdvancedOptions: false,
            defaultSource: "local",
            styles: {
              palette: {
                action: "#06476E",
              },
            },
          }}
          onUpload={(result: any, widget) => {
            toast.success("Certificate  is uploaded");
            setCertificate(result?.info?.public_id);
          }}
        >
          {({ open }) => {
            return (
              <>
                {!certificate ? (
                  <Button
                    icon={<BsUpload />}
                    onClick={() => open()}
                    className="min-h-[300px] w-full bg-green-50 flex flex-col justify-center items-center"
                  >
                    <p className="text-sm opacity-85 font-medium">
                      Upload certicate here
                    </p>
                  </Button>
                ) : (
                  <div className="w-full flex items-center">
                    <CldImage
                      src={certificate}
                      alt="certificate"
                      width={800}
                      height={600}
                      quality={100}
                      className="hover:cursor-pointer"
                      onClick={() => open()}
                    />
                  </div>
                )}
              </>
            );
          }}
        </CldUploadWidget>
        <div className="w-full  flex justify-end pt-3">
          <CtmButton
            label={loading ? "Submitting..." : "Submit"}
            customStyle={
              "bg-blue-1 py-2 hover:bg-blue-800 text-white w-fit rounded font-semibold"
            }
            Click={deliverCertificate}
          />
        </div>
      </div>
    </Modal>
  );
};
export default MemberShipCertificateUploader;
