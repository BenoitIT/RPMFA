"use client";
import { FormEvent, useState } from "react";
import Button from "../(components)/buttons/primaryBtn";
import { PrimaryInput } from "../(components)/inputs/Inputs";
import Footer from "../(components)/navigations/Footer";
import NavBar from "../(components)/navigations/NavBar";
import { toast } from "react-toastify";

const Contact = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const form = e.currentTarget;
      const formData = new FormData(e.currentTarget);
      const formEntries = Object.fromEntries(formData.entries());
      const response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formEntries),
      });
      const data = await response.json();
      if (data.status == 201) {
        toast.success(data?.message);
        form.reset();
        setLoading(false);
      } else if (data?.status == 400) {
        toast.success(data?.message);
        setLoading(false);
      } else {
        toast.error(data[0]?.path[0] + " " + data[0].message);
        setLoading(false);
      }
    } catch (err) {
      return;
    }
  };

  return (
    <>
      <NavBar />
      <div className="grid grid-flow-row place-content-center px-4 w-full max-sm:w-[95%] max-sm:mx-auto py-5">
        <h1 className="text-blue-1 font-semibold text-xl text-center max-sm:text-lg mb-6">
          Contact Us
        </h1>
        <div className=" w-[45vw] max-sm:w-screen max-md:w-[60vw]  border border-gray-150 rounded-lg p-5 ">
          <form onSubmit={handleSubmit} className="grid grid-flow-row gap-3">
            <PrimaryInput
              label="First Name"
              type="text"
              placeholder="Enter Your First Name"
              name="firstName"
              changeHandler={() => {}}
            />
            <PrimaryInput
              label="Last Name"
              type="text"
              placeholder="Enter Your Last Name"
              name="lastName"
              changeHandler={() => {}}
            />
            <PrimaryInput
              label="Email Address"
              type="email"
              placeholder="Enter Your Email Address"
              name="email"
              changeHandler={() => {}}
            />
            <PrimaryInput
              label="Subject"
              type="text"
              placeholder="Enter Your Subject Here"
              name="subject"
              changeHandler={() => {}}
            />
            <div className="grid gap-2">
              <label htmlFor="message text-sm">Message</label>
              <textarea
                id="message"
                name="message"
                className="focus:outline-none outline-none w-full h-28 bg-gray-1 border border-gray-150 rounded-lg p-2 placeholder:text-sm"
                placeholder="Enter Your Message Here"
              ></textarea>
            </div>
            <Button
              label={loading ? "Loading..." : "Send Message"}
              customStyle="py-3 bg-blue-1 text-white mt-2 w-full rounded-lg"
              type="submit"
            />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
