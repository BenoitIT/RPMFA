"use client";
import Link from "next/link";
import Button from "../buttons/primaryBtn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMenuSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { signOut, useSession } from "next-auth/react";

const NavBar = ({ isLoggedin }: any) => {
  const session: any = useSession();
  const currentPath = usePathname();
  const router = useRouter();
  const handleMoveSignUp = () => {
    router.push("/signup");
  };
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/auth/login";
  };
  const handleDashbordRedirection = () => {
    if (session?.data?.user?.role == "admin") {
      router.push("/dashboard");
    } else {
      router.push("/member/dashboard");
    }
  };
  const menus = [
    {
      id: 1,
      title: "Members",
      path: "/members",
    },
    {
      id: 2,
      title: "Announcements",
      path: "/announcements",
    },
    {
      id: 3,
      title: "Contact Us",
      path: "/contactUs",
    },
  ];
  return (
    <nav className="bg-white  w-full text-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/logo/logooo.png"
            className="h-14"
            alt="rpmfa Logo"
            width={62}
            height={70}
            quality={100}
          />
        </Link>
        <div className="flex md:order-2 space-x-2 lg:space-x-3 rtl:space-x-reverse">
          <Button
            label={isLoggedin ? "Log out" : "Login"}
            customStyle="border text-blue-1 py-1 border-blue-700 hover:bg-blue-1 hover:text-white mt-1 md:mt-0"
            Click={handleSignOut}
          />
          {session?.data?.user ? (
            <Button
              label="Dashboard"
              customStyle="bg-blue-1 py-1 hover:bg-blue-900 text-white border border-blue-700 mt-1 md:mt-0"
              Click={handleDashbordRedirection}
            />
          ) : (
            <Button
              label="Get started"
              customStyle="bg-blue-1 py-1 hover:bg-blue-900 text-white border border-blue-700 mt-1 md:mt-0"
              Click={handleMoveSignUp}
            />
          )}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center mt-1  w-10 h-fit hover:bg-blue-700  hover:text-white justify-center text-sm text-gray-500 rounded md:hidden"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <IoMenuSharp size={25} />
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col w-full md:flex-row font-normal text-sm p-4 md:p-0 mt-3  rounded-lg  md:space-x-8 ">
            {menus.map((menu) => (
              <li key={menu.id} className="list-none">
                <Link
                  href={menu.path}
                  className={classNames(
                    "block py-2 px-3 md:p-0 text-black hover:text-blue-1",
                    currentPath === menu.path ? "text-blue-1" : ""
                  )}
                  aria-current="page"
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
