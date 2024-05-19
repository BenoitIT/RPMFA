"use client";
import Button from "../(components)/buttons/primaryBtn";
import { PrimaryInput } from "../(components)/inputs/Inputs";
import Footer from "../(components)/navigations/Footer";
import NavBar from "../(components)/navigations/NavBar";

const Contact = () => {
  return (
    <>
      <NavBar />
      <div className="grid grid-flow-row place-content-center px-4 w-full max-sm:w-[95%] max-sm:mx-auto py-5">
        <h1 className="text-blue-1 font-semibold text-3xl text-center max-sm:text-lg mb-6">
          Contact Us
        </h1>
        <div className="grid w-[45vw] max-sm:w-screen max-md:w-[60vw] gap-3 border border-gray-150 rounded-lg py-3 px-5">
          <PrimaryInput
            label="First Name"
            type="text"
            placeholder="Enter Your First Name"
            name="firstname"
            changeHandler={() => {}}
          />
          <PrimaryInput
            label="Last Name"
            type="text"
            placeholder="Enter Your Last Name"
            name="lastname"
            changeHandler={() => {}}
          />
          <PrimaryInput
            label="Email Address"
            type="email"
            placeholder="Enter Your Email Address"
            name="email address"
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
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="focus:outline-none outline-none w-full h-24 bg-gray-1 border border-gray-150 rounded-lg p-2"
              placeholder="Enter Your Message Here"
            ></textarea>
          </div>
          <Button
            label="Send Message"
            customStyle="py-3 bg-blue-1 text-white mt-2 w-full rounded-lg"
            Click={() => {}}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
