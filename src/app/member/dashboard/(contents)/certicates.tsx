import { MdOutlineFileDownload } from "react-icons/md";
const Certificates = () => {
  const certicates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="w-full flex items-center flex-col gap-4 py-[10vh] bg-white rounded">
      <div className="w-fit grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {certicates.map((num) => (
          <Certifcate name={num} key={num} />
        ))}
      </div>
    </div>
  );
};

export default Certificates;

const Certifcate = ({ name }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-[200px] bg-blue-50 h-[140px] rounded flex justify-center items-center">
        <MdOutlineFileDownload className=" text-blue-600 text-2xl" />
      </div>
      <h2 className="text-sm ml-2">Certificate {name}</h2>
    </div>
  );
};
