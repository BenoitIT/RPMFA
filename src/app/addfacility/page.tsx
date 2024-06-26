"use client";
import Link from "next/link";
import Image from "next/image";
import { PrimaryInput } from "../(components)/inputs/Inputs";
import { SuccessModal } from "../(components)/modals/SuccessModal";
import Footer from "../(components)/navigations/Footer";
import { Alert, Button, Progress } from "antd";
import { FormEvent, useEffect, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { PrimarySelectorInput } from "../(components)/inputs/SelectorInputs";
import "react-toastify/dist/ReactToastify.css";
import provinces from "../api/(data)/provinces";
import districts from "../api/(data)/districts";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import { FaArrowLeft } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import sectors from "../api/(data)/sectors";

interface FacilityTypes {
  id: number;
  facilityName: string;
  facilityCategory: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  tinNumber: string;
  userId: number;
  plotNumber: string;
  documents: number[];
}
const AddFacility = () => {
  const numberOfSections = 4;
  const session: any = useSession();
  const token = session?.data?.user?.name?.accessToken;
  const [currentSection, setCurrentSection] = useState(1);
  const [currentProgress, setCurrentProgress] = useState(25);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [Uploadeddocuments, setDocuments] = useState<string[]>([]);
  const [fileList, setFileList] = useState<any>([]);
  const [provinceDistricts, setDistricts] = useState<any[]>([]);
  const [Districtsectors, setSectors] = useState<any[]>([]);
  const [worning, setWorning] = useState("");
  const [formValues, setFormValues] = useState<FacilityTypes>({
    id: 0,
    facilityName: "",
    facilityCategory: "",
    tinNumber: "",
    province: "",
    district: "",
    sector: "",
    cell: "",
    userId: 0,
    plotNumber: "",
    documents: [],
  });
  useEffect(() => {
    const handleButtonDisability = () => {
      if (
        currentSection == 1 &&
        formValues.facilityName == "" &&
        formValues.facilityName == "" &&
        formValues.tinNumber == ""
      ) {
        setWorning("Fill the missing data");
        setDisabled(true);
      } else if (
        currentSection == 2 &&
        formValues.district == "" &&
        formValues.sector == "" &&
        formValues.cell == ""
      ) {
        setWorning("Fill the missing data");
        setDisabled(true);
      } else if (currentSection == 3 && Uploadeddocuments.length < 1) {
        setWorning("Upload the supporting documents");
        setDisabled(true);
      } else {
        setWorning("");
        setDisabled(false);
      }
    };
    handleButtonDisability();
  }, [formValues, currentSection, Uploadeddocuments]);

  useEffect(() => {
    const getGroupedDistricts = () => {
      const groupedDistricts = districts.filter(
        (district) =>
          district.province.toLowerCase() ==
          formValues.province.toLocaleLowerCase()
      );
      return setDistricts(groupedDistricts);
    };
    getGroupedDistricts();
  }, [formValues.province]);
  useEffect(() => {
    const getGroupedSectors = () => {
      const groupedSectors = sectors.filter(
        (sector) =>
          sector?.district?.toLowerCase() ==
          formValues.district.toLocaleLowerCase()
      );
      return setSectors(groupedSectors);
    };
    getGroupedSectors();
  }, [formValues.district]);

  const handleNext = (e: any) => {
    e.preventDefault();
    if (currentSection < numberOfSections) {
      setCurrentSection(currentSection + 1);
      setCurrentProgress(currentProgress + 24.9);
    }
  };
  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, userId, documents, ...otherValues } = formValues;
    const facilityData = {
      ...otherValues,
      documents: Uploadeddocuments,
    };
    try {
      setLoading(true);
      const response = await fetch(`/api/facility`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(facilityData),
      });
      const responseData = await response.json();
      if (responseData.status === 201) {
        setOpenModal(true);
        setLoading(false);
      } else {
        toast.error(responseData[0]?.path[0]+' '+responseData[0].message);
        setLoading(false);
      }
    } catch (err) {
      toast.error("Unexpected error occurs");
      setLoading(false);
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
      <div className="flex justify-center gap-2">
        {currentSection > 1 && (
          <button
            className="w-8 h-8 text-white rounded-full bg-blue-700 pl-2 mt-4"
            onClick={() => {
              setCurrentSection(currentSection - 1);
              setCurrentProgress(currentProgress - 24.8);
            }}
          >
            <FaArrowLeft />
          </button>
        )}
        <h1 className="text-xl font-normal text-center py-4 leading-tight tracking-tight text-blue-600 md:text-2xl">
          Add Your Health Facility
        </h1>
      </div>
      {worning.length > 0 && (
        <Alert message={worning} type="warning" showIcon closable />
      )}
      <div className="w-full bg-white rounded-lg shadow dark:border my-3 sm:max-w-lg xl:p-0 border border-blue-100 m-3">
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
                  value={formValues.facilityName}
                  placeholder="Enter health facility name here"
                  changeHandler={handleInputChange}
                />
                <PrimarySelectorInput
                  label="Health Facility Category"
                  name="facilityCategory"
                  value={formValues.facilityCategory}
                  options={[
                    "Select category here",
                    "General clinic",
                    "Polyclinic",
                    "Specialized Clinic",
                    "Hospital",
                  ]}
                  changeHandler={handleInputChange}
                />
                <PrimaryInput
                  label="TIN Number"
                  type="text"
                  name="tinNumber"
                  value={formValues.tinNumber}
                  placeholder="Enter TIN number here"
                  changeHandler={handleInputChange}
                />
              </>
            ) : currentSection === 2 ? (
              <>
                <PrimarySelectorInput
                  label="Province"
                  name="province"
                  value={formValues.province}
                  options={provinces}
                  changeHandler={handleInputChange}
                />
                <PrimarySelectorInput
                  label="District"
                  name="district"
                  value={formValues.district}
                  options={provinceDistricts}
                  changeHandler={handleInputChange}
                />
                <PrimarySelectorInput
                  label="Sector"
                  name="sector"
                  value={formValues.sector}
                  options={Districtsectors}
                  changeHandler={handleInputChange}
                />
                <PrimaryInput
                  label="Cell"
                  type="text"
                  name="cell"
                  value={formValues.cell}
                  placeholder="Enter cell here"
                  changeHandler={handleInputChange}
                  required={false}
                />
                <PrimaryInput
                  label="Plot Number"
                  type="text"
                  name="plotNumber"
                  value={formValues.plotNumber}
                  placeholder="Enter plot number here"
                  changeHandler={handleInputChange}
                  required={false}
                />
              </>
            ) : currentSection === 3 ? (
              <>
                <CldUploadWidget
                  uploadPreset="emrtyzay"
                  options={{
                    sources: ["local", "google_drive"],
                    cropping: false,
                    multiple: true,
                    showAdvancedOptions: false,
                    defaultSource: "local",
                    styles: {
                      palette: {
                        action: "#06476E",
                      },
                    },
                  }}
                  onUpload={(result: any, widget) => {
                    toast.success("Document is uploaded");
                    setDocuments((prev) => [...prev, result?.info?.public_id]);
                    setFileList(result.info?.original_filename);
                  }}
                >
                  {({ open }) => {
                    return (
                      <Button
                        icon={<BsUpload />}
                        onClick={() => open()}
                        className="h-[200px] w-[440px] bg-green-50 flex flex-col justify-center items-center"
                      >
                        <p className="text-sm opacity-85">Upload file here</p>
                      </Button>
                    );
                  }}
                </CldUploadWidget>
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-black text-sm">
                    Upload the following documents if available
                  </p>
                  <ul className="text-sm text-black opacity-85 ml-4">
                    <li className="list-disc">
                      Only upload membership certificate.if you are already
                      member of rpmfa.
                    </li>
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
                    {formValues.facilityName}
                  </p>
                  <p className="font-medium text-black text-sm">
                    Health Facility Category
                  </p>
                  <p className="font-normal text-black text-sm">
                    {formValues.facilityCategory}
                  </p>
                  <p className="font-medium text-black text-sm">Province</p>
                  <p className="font-normal text-black text-sm">
                    {formValues.province}
                  </p>
                  <p className="font-medium text-black text-sm">District</p>
                  <p className="font-normal text-black text-sm">
                    {formValues.district}
                  </p>
                  <p className="font-medium text-black text-sm">Sector</p>
                  <p className="font-normal text-black text-sm">
                    {formValues.sector}
                  </p>
                  <p className="font-medium text-black text-sm">Cell</p>
                  <p className="font-normal text-black text-sm">
                    {formValues.cell}
                  </p>
                </div>
              </div>
            )}
            {currentSection < 4 ? (
              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleNext}
                disabled={disabled}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:opacity-85"
                disabled={loading}
              >
                {loading ? "Loading.." : "submit"}
              </button>
            )}
          </form>
        </div>
      </div>
      <SuccessModal
        open={openModal}
        handleOpen={setOpenModal}
        NextPath="/member/dashboard"
      />
      <Footer />
    </main>
  );
};
export default AddFacility;
