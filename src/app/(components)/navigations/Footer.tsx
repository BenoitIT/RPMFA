import Image from "next/image";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoTwitter } from "react-icons/io5";
const Footer = () => {
  return (
    <div className="text-black bg-gray-1 w-full items-center flex justify-center px-6 lg:px-0">
      <div className="w-full lg:px-16 md:px-8 px-4 flex justify-center">
        <div className="py-6 h-fit flex flex-col gap-y-6 lg:flex-row lg:gap-10 my-6">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo/logooo.png"
                className="h-auto md:h-14 lg:h-20"
                alt="rpmfa Logo"
                width={90}
                height={200}
                quality={100}
              />
            </Link>
            <p className="text-black my-2 text-sm font-medium">
              Subscribe to our newsletter
            </p>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter your email here"
                className="py-2 px-6 placeholder:text-sm rounded outline-none"
              />
              <button
                type="submit"
                className="text-white bg-blue-1 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[280px]">
            <p className="text-black my-2 text-sm font-medium">Contact</p>
            <p className="text-black  text-sm opacity-90">+250 788 515 358</p>
            <p className="text-black text-sm opacity-90">info@rpmfa.rw</p>
            <div className="flex gap-3">
              <MdFacebook />
              <AiFillInstagram />
              <IoLogoTwitter />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[280px]">
            <p className="text-black my-2 text-sm font-medium">Quick Links</p>
            <p className="text-black  text-sm opacity-90">Library</p>
            <p className="text-black text-sm opacity-90">Members</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-black my-2 text-sm font-medium">Address</p>
            <p className="text-black  text-sm opacity-90">
              Kigali, Rwanda Kicukiro, Sonatubes KN 3 Road Silverback Mall
              2nd Floor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
