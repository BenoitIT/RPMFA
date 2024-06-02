import Link from "next/link";
import { PiGreaterThanLight } from "react-icons/pi";
import Contribution from "../(contents)/contributions";
import { auth } from "@/auth";
import { convertTimestamp } from "@/app/utilities/timeConverters";

const Page = async () => {
  const session: any = await auth();
  const userId = session?.user?.id;
  const response = await fetch(
    `${process.env.NEXT_APP_URL}/api/contribution/user/${userId}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  if (data.status === 200) {
    const contributions = data.contributions.map((contribution?: any) => ({
      id: contribution?.id,
      contributionAmount: "RWF" + " " + contribution?.contributionAmount,
      depositReceiptNumber: contribution?.depositRecieptNumber,
      status: contribution?.status,
      created_at: convertTimestamp(contribution?.createdAt),
    }));

    return (
      <div className="mt-4 w-full">
        <h3 className="text-gray-600 text-sm flex gap-1">
          <Link
            href="/member/dashboard"
            className="hover:text-blue-700 hover:cursor-pointer"
          >
            Home
          </Link>
          <PiGreaterThanLight className="mt-[3px]" />
          <p className="text-blue-700 hover:cursor-pointer">Contributions</p>
        </h3>
        <div className="bg-blue-50 pt-6 -mx-4 mt-2">
          <Contribution contributions={contributions} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-blue-50 pt-6 -mx-4 mt-2 flex justify-center items-center h-[85vh]">
        <div className="text-black flex justify-center items-center bg-white rounded p-[20vw]">
          Something went wrong while processing contributions!
        </div>
      </div>
    );
  }
};
export default Page;
