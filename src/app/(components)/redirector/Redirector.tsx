"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Redirector = () => {
  const router = useRouter();
  useEffect(() => {
    router.back();
  }, []);
  return (
    <div className="h-[300px] flex justify-center items-center font-medium">
      You are try to access the contents which do not match your role
    </div>
  );
};
export default Redirector;
