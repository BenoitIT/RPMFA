import Link from "next/link";
import { PiGreaterThanLight } from "react-icons/pi";
import Contribution from "../(contents)/contributions";

const Page = async () => {
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
      <Contribution/>
      </div>
    </div>
  );
};
export default Page;
