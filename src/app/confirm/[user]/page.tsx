import Link from "next/link";
import Image from "next/image";
import { PrimaryInput } from "../../(components)/inputs/Inputs";
import { SuccessModal } from "../../(components)/modals/SuccessModal";
import Footer from "../../(components)/navigations/Footer";
import { Alert } from "antd";
interface Props {
  params: {
    user: string;
  };
}
const Page = async ({ params }: Props) => {
  const token = params?.user;
  const response = await fetch(
    `${process.env.NEXT_APP_URL}/api/users/confirm`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  const responseData = await response.json();
  if (responseData.status === 200) {
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
          Create your account
        </h1>
        <div className="w-full  bg-white rounded-lg shadow dark:border my-3 sm:max-w-lg xl:p-0 border border-blue-100 m-3">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6">
              <PrimaryInput
                label="First Name"
                type="text"
                name="firstName"
                placeholder="Enter your first name here"
                changeHandler={() => {}}
              />
              <PrimaryInput
                label="Last Name"
                type="text"
                name="lastName"
                placeholder="Enter your last name here"
                changeHandler={() => {}}
              />
              <PrimaryInput
                label="Email"
                type="text"
                name="email"
                placeholder="Enter your email here"
                changeHandler={() => {}}
              />
              <PrimaryInput
                label="Password"
                type="password"
                name="password"
                placeholder="Enter password here"
                changeHandler={() => {}}
              />
              <PrimaryInput
                label="Confirm Password"
                type="password"
                name="Confirmpassword"
                placeholder="Confirm password"
                changeHandler={() => {}}
              />
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create account
              </button>
            </form>
          </div>
        </div>
        <SuccessModal open={true} handleOpen={() => {}} />
        <Footer />
      </main>
    );
  } else {
    return (
      <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center bg-white">
        <Alert
          message="Error"
          description={responseData.message}
          type="error"
          showIcon
        />
        <Link href={"/"}>
          <button
            type="submit"
            className="w-full text-blue-700 hover:bg-blue-500 hover:text-white  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Homepage
          </button>
        </Link>
      </div>
    );
  }
};
export default Page;
