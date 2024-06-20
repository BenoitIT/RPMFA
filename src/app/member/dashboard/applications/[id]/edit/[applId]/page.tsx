"use client";
import Link from "next/link";
import Image from "next/image";
import { Alert, Button, Progress } from "antd";
import { FormEvent, useEffect, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { PrimaryInput } from "@/app/(components)/inputs/Inputs";
import { PrimarySelectorInput } from "@/app/(components)/inputs/SelectorInputs";
import "react-toastify/dist/ReactToastify.css";
import provinces from "@/app/api/(data)/provinces";
import districts from "@/app/api/(data)/districts";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import { FaArrowLeft } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import sectors from "@/app/api/(data)/sectors";

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
  const { applId }: any = useParams();
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
  const router=useRouter();
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
    const fetchExistingInfo = async () => {
      const response = await fetch(`/api/applications/${applId}`, {
        cache: "no-store",
      });
      const data = await response.json();
      if (data.status == 200) {
        const application = data.application;
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          facilityName: application.facilityName,
          facilityCategory: application.facilityCategory,
          tinNumber: application.tinNumber,
          province: application.province,
          district: application.district,
          cell: application.cell,
          plotNumber: application.plotNumber,
          documents: application.documents,
        }));
      }
    };
    fetchExistingInfo();
  }, [applId]);
  useEffect(() => {
    const handleButtonDisability = () => {
      if (
        currentSection == 1 &&
        formValues.facilityName == "" &&
        formValues.facilityName == ""
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
        setWorning("Upload the missing documents");
        setDisabled(true);
      } else {
        setDisabled(false);
        setWorning("Upload the missing documents");
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
      const response = await fetch(`/api/applications/user/${applId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(facilityData),
      });
      const responseData = await response.json();
      if (responseData.status === 200) {
        toast.success(responseData.message);
        setLoading(false);
        router.back();
      } else {
        toast.error(responseData[0]?.path[0]+' '+responseData[0].message);
        setLoading(false);
      }
    } catch (err) {
      toast.error("Unexpected error occurs");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="flex justify-center gap-2">
        {currentSection > 1 && (
          <button
            className="w-8 h-8 text-white rounded-full bg-blue-700 pl-2 mt-2"
            onClick={() => {
              setCurrentSection(currentSection - 1);
              setCurrentProgress(currentProgress - 24.8);
            }}
          >
            <FaArrowLeft />
          </button>
        )}
        <h1 className="text-xl font-normal text-center py-2 leading-tight tracking-tight text-blue-600 md:text-2xl">
          Edit Application Info.
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
                />
                <PrimaryInput
                  label="Plot Number"
                  type="text"
                  name="plotNumber"
                  value={formValues.plotNumber}
                  placeholder="Enter plot number here"
                  changeHandler={handleInputChange}
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
                    Re-Upload the following documents if available
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
                className="w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};
export default AddFacility;
