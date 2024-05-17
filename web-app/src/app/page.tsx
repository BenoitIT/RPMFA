import Image from "next/image";
import NavBar from "./(components)/navigations/NavBar";
import Card, {
  SimpleCard,
  SimpleImageCard,
} from "./(components)/cards/simpleCard";
import { FaStaffSnake } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { LiaListAltSolid } from "react-icons/lia";
import { FaChartLine } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";
import { GiToothbrush } from "react-icons/gi";
import { BsPeopleFill } from "react-icons/bs";
import Footer from "./(components)/navigations/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="sticky w-full top-0 z-40">
        <NavBar />
      </div>
      <div className="p-4 w-full mt-6">
        <div className="lg:w-1/2 md:w-full w-full text-left lg:mx-11 mx-4 flex flex-col space-y-4">
          <p className="capitalize lg:text-5xl text-3xl text-blue-700 font-normal leading-tight">
            Rwanda Private Medical Facilities Association
          </p>
          <p className="text-sm text-black ml-1  opacity-90 leading-5">
            {
              "RPMFA is an umbrella organization that brings together all Private Health Facilities in Rwanda (Hospitals, Polyclinics, General Clinics and Specialized Clinics), as published in the Official Gazette No 11 of 18/03/2019."
            }
          </p>
        </div>
        <div className="relative lg:m-12 z-10 m-5 h-[400px] lg:h-[550px] w-11/12 overflow-hidden flex items-center">
          <div className="w-full h-full">
            <Image
              src="/images/homeImage.png"
              alt="image"
              quality={100}
              className="rounded w-full"
              width={1000}
              height={800}
              style={{ objectFit: "fill" }}
            />
          </div>
          <div className="bg-white rounded-full shadow-md w-[200px] h-[200px] absolute  bottom-[20px] md:bottom-[190px]  right-[40px] lg:bottom-10  lg:right-10 flex flex-col justify-center items-center">
            <p className="font-semibold text-blue-700 text-4xl">200+</p>
            <p className="font-normal text-blue-700 text-xl">Members</p>
          </div>
        </div>
        <div className="w-full my-6">
          <p className="font-medium text-blue-700 text-3xl mx-6 lg:mx-11 my-4">
            Our Aims
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-6 lg:mx-9">
            <Card
              icon={<FaStaffSnake />}
              description="Ensure representation of Private Medical Facilities in meetings/forums and organizations aiming at promotion of health in Rwanda"
            />
            <Card
              icon={<IoIosPeople />}
              description="Advocate for our Members in different institutions"
            />
            <Card
              icon={<PiMagnifyingGlassFill />}
              description="Carry out important research activities for sustainable development of our Association."
            />
            <Card
              icon={<LiaListAltSolid />}
              description="Carry out other activities enabling the achievement of set objectives."
            />
          </div>
        </div>
      </div>
      <div className="bg-blue-700 h-fit w-full p-4 flex justify-center flex-col">
        <div className="m-6">
          <h1 className="text-3xl lg:m-6 m-4 text-white">Our Objectives</h1>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 w-full h-fit lg:px-12 px-7">
          <div className="w-full">
            <Image
              src="/images/peoples.png"
              alt="image"
              quality={100}
              className="rounded"
              width={550}
              height={400}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <SimpleCard
              icon={<FaHospital />}
              description="Bring together all private medical facilities"
            />
            <SimpleCard
              icon={<FaChartLine />}
              description="Promote the development of the profession of private medical doctors defend members’ interests in professional, economic and social matters."
            />
            <SimpleCard
              icon={<MdMenuBook />}
              description="Train and facilitate members to access information about their profession."
            />
            <SimpleCard
              icon={<GiToothbrush />}
              description="Develop public institutions and private medical facilities partnership basing on laws and policies in health sector."
            />
            <SimpleCard
              icon={<BsPeopleFill />}
              description="Harmonize professional collaboration of members."
            />
          </div>
        </div>
      </div>
      <div className="lg:my-12 md:my-8 my-4">
        <div className="lg:p-12 md:p-6 px-11 p-6 h-fit grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3">
          <Image
            src="/logo/rbc.png"
            alt="image"
            quality={100}
            className="rounded"
            width={300}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <Image
            src="/logo/moh.png"
            alt="image"
            quality={100}
            className="rounded"
            width={150}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <Image
            src="/logo/medical.png"
            alt="image"
            quality={100}
            className="rounded"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <Image
            src="/logo/psf.png"
            alt="image"
            quality={100}
            className="rounded"
            width={80}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <Image
            src="/logo/rdb.png"
            alt="image"
            quality={100}
            className="rounded"
            width={300}
            height={100}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <div className="my-2">
        <div className="m-6">
          <h1 className="text-3xl lg:m-6 m-4 text-blue-700">Our Team</h1>
        </div>
        <div className="lg:px-12 md:px-6 p-4 h-fit grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3">
          <SimpleImageCard
            source="/images/mugenzi.png"
            name="Dr. Mugenzi Dominique Savio"
            workTitle="Chairman"
          />
          <SimpleImageCard
            source="/images/kalima.png"
            name="Mr. Kalima Jean Malik"
            workTitle="Vice Chairman"
          />
          <SimpleImageCard
            source="/images/peace.png"
            name="Dr. Peace Mukabalisa"
            workTitle="Secretary"
          />
          <SimpleImageCard
            source="/images/kaitesi.png"
            name="Dr. Kaitesi Batamuliza Mukara"
            workTitle="Treasurer"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
