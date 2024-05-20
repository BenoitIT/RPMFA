"use client"
import Link from "next/link";
import Image from "next/image";
import { PrimaryInput } from "../(components)/inputs/Inputs";
import { EmailConfirmationModal } from "../(components)/modals/EmailConfirmationModal";
import { SuccessModal } from "../(components)/modals/SuccessModal";
import Footer from "../(components)/navigations/Footer";
import { useState } from "react";

const SignUpPage = () => {
  const [openModal,setOpenModal]=useState(false);
  const handleSubmit=()=>{
    setOpenModal(true)
  }
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
      <h1 className="text-xl font-medium text-center py-4 leading-tight tracking-tight text-blue-600 md:text-2xl lg:text-3xl">
        Login
      </h1>
      <div className="w-full  bg-white rounded-lg shadow dark:border my-3 sm:max-w-lg xl:p-0 border border-blue-100 m-3">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-4 md:space-y-6">
            <PrimaryInput
              label="Email"
              type="text"
              name="email"
              placeholder="Enter your email here"
              changeHandler={() => {
                "use client"
              }}
            />
            <PrimaryInput
              label="Password"
              type="password"
              name="passowrd"
              placeholder="Enter password here"
              changeHandler={() => {
                "use client"
              }}
            />
            <div className="flex flex-col space-y-2">
            <button
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleSubmit}
            >
              Login
            </button>
            <Link className="forgot-password flex text-blue-600 hover:text-blue-500 text-sm justify-end" href={"/forgot_password"}>
              Forgot password?
            </Link>
            </div>

          </form>
        </div>
      </div>
      <EmailConfirmationModal open={openModal} handleOpen={setOpenModal} NextPath={""}/>
      {/* <SuccessModal/> */}
      <Footer />
    </main>
  );
};
export default SignUpPage;
