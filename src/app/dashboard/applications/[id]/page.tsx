"use server";
import { PiGreaterThanLight } from "react-icons/pi";
import ApplicationDetails from "../../(components)/ContentsContainers/ApplicationDetails";


const Page =async({params}:any) => {
 const response =await fetch(`http://localhost:3000/api/applications/${params?.id}`,{cache: "no-store"});
 const responseBody=await response.json();
 if(responseBody?.status==200||!responseBody.application==null){
  const application=responseBody.application;
  return (
    <div className="mt-4 w-full h-[90vh]">
      <h3 className="text-gray-600 text-sm flex gap-1">
        Home
        <PiGreaterThanLight className="mt-[4px]" />
        Applications
        <PiGreaterThanLight className="mt-[4px]" />
        Applications Details
      </h3>
     <div className="bg-blue-50 p-6 h-full -ml-4 mt-3">
      <ApplicationDetails application={application} category="applications"/>
     </div>
    </div>
  );
}
return <div className="text-xl font-thin h-[90vh] flex justify-center w-full items-center"><div className="p-4 w-fit text-white bg-red-400 rounded shadow">The requested application is not found</div></div>
};

export default Page;