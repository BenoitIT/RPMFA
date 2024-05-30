"use client";
import Link from "next/link";
import Image from "next/image";
import { PrimaryInput } from "../(components)/inputs/Inputs";
import { EmailConfirmationModal } from "../(components)/modals/EmailConfirmationModal";
import Footer from "../(components)/navigations/Footer";
import { FormEvent, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { PrimarySelectorInput } from "../(components)/inputs/SelectorInputs";
const SignUpPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userTitle, setUserTitle] = useState({
    title: "",
  });
  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserTitle((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const formData = new FormData(e.currentTarget);
      const values: { [key: string]: any } = { ...userTitle };
      formData.forEach((value, key) => {
        values[key] = value;
      });
      if (!values.password === values.Confirmpassword) {
        toast.error("Password is not confirmed");
        setLoading(false);
      } else if (!values.email) {
        toast.error("Email must exist");
        setLoading(false);
      } else if (!values.firstName) {
        toast.error("First name must exist");
        setLoading(false);
      } else {
        const response = await fetch(`/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const responseData = await response.json();
        if (responseData.status === 201) {
          toast.success(responseData.message);
          await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          form.reset();
          const emailResponse = await fetch("/api/emails/accountConfirmation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fistName: values.firstName,
              email: values.email,
              token: responseData.token,
            }),
          });
          const data = await emailResponse.json();
          if (data.status == 200) {
            setOpenModal(true);
          } else {
            toast.error("Could not send now!");
          }
          setLoading(false);
        } else if (responseData.status === 400) {
          toast.error(responseData.message);
          setLoading(false);
        } else {
          toast.error(responseData[0].message);
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error("Some error occured");
      setLoading(false);
    }
  };
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
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
              label="Telephone"
              type="text"
              name="phone"
              placeholder="Enter your phone number here"
              changeHandler={() => {}}
            />
            <PrimarySelectorInput
              label="Title"
              name="title"
              value={userTitle.title}
              options={[
                "Select title",
                "Owner",
                "Managing director",
                "Clinical director",
              ]}
              changeHandler={handleInputChange}
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
              {loading ? "Creating..." : "Create an account"}
            </button>
          </form>
        </div>
      </div>
      <EmailConfirmationModal
        open={openModal}
        handleOpen={setOpenModal}
        NextPath={""}
      />
      {/* <SuccessModal/> */}
      <Footer />
    </main>
  );
};
export default SignUpPage;
