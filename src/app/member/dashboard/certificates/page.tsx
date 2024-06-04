import Link from "next/link";
import { PiGreaterThanLight } from "react-icons/pi";
import Certificates from "../(contents)/certicates";
import { auth } from "@/auth";

const Page = async () => {
  const session: any = await auth();
  const userId = session?.user?.id;
  const response = await fetch(
    `${process.env.NEXT_APP_URL}/api/certificate/${userId}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  if(data.status==200){
    const memberShips=data.data;
  return (
    <div className="mt-4 w-full">
      <h3 className="text-gray-600 text-sm flex gap-1 py-2">
        <Link
          href="/member/dashboard"
          className="hover:text-blue-700 hover:cursor-pointer"
        >
          Home
        </Link>
        <PiGreaterThanLight className="mt-[3px]" />
        <p className="text-blue-700 hover:cursor-pointer">Membership Certificate</p>
      </h3>
      <div className="bg-blue-50 p-6 -mx-4">
      <Certificates  memberships={memberShips}/>
      </div>
    </div>
  );
}
}
export default Page;
