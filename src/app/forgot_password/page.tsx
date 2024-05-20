"use client"
import Link from "next/link";
import Image from "next/image";
import { PrimaryInput } from "../(components)/inputs/Inputs";
import { EmailConfirmationModal } from "../(components)/modals/EmailConfirmationModal";
import Footer from "../(components)/navigations/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const router=useRouter();
    const handleSubmit = () => {
        router.push("/reset_pswd_link")
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
            <h1 className="text-xl mt-10 font-medium text-center py-4 leading-tight tracking-tight text-blue-600 md:text-2xl lg:text-3xl">
                Forgot Password
            </h1>
            <p className="text-center text-sm text-gray-500">
                We will send reset instructions to your email
            </p>
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
                        <div className="flex flex-col space-y-2">
                            <button
                                type="button"
                                className="w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={handleSubmit}
                            >
                                Reset Password
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <EmailConfirmationModal open={openModal} handleOpen={setOpenModal} NextPath={""} />
            {/* <SuccessModal/> */}
            <Footer />
        </main>
    );
};
export default SignUpPage;
