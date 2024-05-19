"use client"
import Link from "next/link";
import Image from "next/image";
import { PrimaryInput } from "../../(components)/inputs/Inputs";
import { EmailConfirmationModal } from "../../(components)/modals/EmailConfirmationModal";
import Footer from "../../(components)/navigations/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotForm from "@/app/(components)/auth/forgot_form";

const SignUpPage = () => {
  
    return (
        <ForgotForm />
    );
};
export default SignUpPage;
