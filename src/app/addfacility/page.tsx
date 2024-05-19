"use client";
import Link from "next/link";
import Image from "next/image";
import { PrimaryInput } from "../(components)/inputs/Inputs";
import { SuccessModal } from "../(components)/modals/SuccessModal";
import Footer from "../(components)/navigations/Footer";
import { Button, Progress, Upload, UploadFile } from "antd";
import { FormEvent, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { PrimarySelectorInput } from "../(components)/inputs/SelectorInputs";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AddFacility = () => {
  const numberOfSections = 4;
  const [currentSection, setCurrentSection] = useState(1);
  const [currentProgress, setCurrentProgress] = useState(25);
  const [openModal, setOpenModal] = useState(false);
  const fileList: UploadFile[] = [
    {
      uid: "0",
      name: "uploaded.pdf",
    },
  ];

  const handleNext = (e: any) => {
    e.preventDefault();
    if (currentSection < numberOfSections) {
      setCurrentSection(currentSection + 1);
      setCurrentProgress(currentProgress + 24.9);
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      const form = e.currentTarget;
      const formData = new FormData(e.currentTarget);
      const values: { [key: string]: any } = {};
      formData.forEach((value, key) => {
        values[key] = value;
      });
      setOpenModal(true);
    } catch (err) {
      toast.error("unexpected error occurs");
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Link
        href="/"
        className="flex items-center space-x-3 rtl:space-x-reverse my-5"
      >
        <Image
          src="/logo/logooo.png"
          className="h-auto"
          alt="rpmfa Logo"
          width={70}
          height={160}
          quality={100}
        />
      </Link>
      <h1 className="text-xl font-normal text-center py-4 leading-tight tracking-tight text-blue-600 md:text-2xl">
        Add Your Health Facility
      </h1>
      <div className="w-full  bg-white rounded-lg shadow dark:border my-3 sm:max-w-lg xl:p-0 border border-blue-100 m-3">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <Progress
            percent={currentProgress}
            showInfo={false}
            className="h-6"
          />
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {currentSection === 1 ? (
              <>
                <PrimaryInput
                  label="Health Facility Name"
                  type="text"
                  name="facilityName"
                  placeholder="Enter health facility name here"
                  changeHandler={() => {}}
                />
                <PrimarySelectorInput
                  label="Health Facility Category"
                  name="facilityCategory"
                  options={[
                    "Genaral clinic",
                    "Polyclinic",
                    "Hospital",
                    "Health center",
                  ]}
                  changeHandler={() => {}}
                />
              </>
            ) : currentSection === 2 ? (
              <>
                <PrimaryInput
                  label="Province"
                  type="text"
                  name="province"
                  placeholder="Enter province here"
                  changeHandler={() => {}}
                />
                <PrimaryInput
                  label="District"
                  type="text"
                  name="district"
                  placeholder="Enter district here"
                  changeHandler={() => {}}
                />
                <PrimaryInput
                  label="Sector"
                  type="text"
                  name="sector"
                  placeholder="Enter sector here"
                  changeHandler={() => {}}
                />
                <PrimaryInput
                  label="Cell"
                  type="text"
                  name="cell"
                  placeholder="Enter cell here"
                  changeHandler={() => {}}
                />
                <PrimaryInput
                  label="Plot Number"
                  type="text"
                  name="plotNumber"
                  placeholder="Enter plot number here"
                  changeHandler={() => {}}
                />
              </>
            ) : currentSection === 3 ? (
              <>
                <Upload defaultFileList={[...fileList]}>
                  <Button
                    icon={<BsUpload />}
                    className="h-[200px] w-[440px] bg-green-50 flex flex-col justify-center items-center"
                  >
                    <p className="text-sm opacity-85">Upload file here</p>
                  </Button>
                </Upload>
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-black text-sm">
                    Upload the following documents if available
                  </p>
                  <ul className="text-sm text-black opacity-85 ml-4">
                    <li className="list-disc">
                      Application letter addressed to RPMFA President
                    </li>
                    <li className="list-disc">
                      Copy of License Application Letter received by MoH
                    </li>
                    <li className="list-disc">
                      Response Letter from MOH about License Application Letter
                    </li>
                    <li className="list-disc">
                      Copy of MOH License for Operating Facilities
                    </li>
                    <li className="list-disc">
                      Responsible Medical Doctor Certified License to practice
                    </li>
                    <li className="list-disc">
                      Employment contract for Responsible Medical Doctor
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="w-full">
                <p className="font-bold text-black text-base py-2 mb">
                  Review and confirmation
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <p className="font-medium text-black text-sm">
                    Health Facility Name
                  </p>
                  <p className="font-normal text-black text-sm">
                    Amaris clinic
                  </p>
                  <p className="font-medium text-black text-sm">
                    Health Facility Category
                  </p>
                  <p className="font-normal text-black text-sm">
                    General clinic
                  </p>
                  <p className="font-medium text-black text-sm">Province</p>
                  <p className="font-normal text-black text-sm">Kigali</p>
                  <p className="font-medium text-black text-sm">District</p>
                  <p className="font-normal text-black text-sm">Gasabo</p>
                  <p className="font-medium text-black text-sm">Sector</p>
                  <p className="font-normal text-black text-sm">Muhima</p>
                  <p className="font-medium text-black text-sm">Cell</p>
                  <p className="font-normal text-black text-sm">cell</p>
                </div>
              </div>
            )}
            {currentSection < 4 ? (
              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
      <SuccessModal open={openModal} handleOpen={setOpenModal} NextPath="" />
      <Footer />
    </main>
  );
};
export default AddFacility;
