"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "@/app/(components)/auth/login-form";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();
  const [userRole, setUserRole] = useState(session?.user?.role);

  useEffect(() => {
    if (session?.user?.role !== userRole) {
      setUserRole(session?.user?.role);
    }
  }, [session?.user?.role]);
  useEffect(() => {
    if (userRole === "member") {
      window.location.href = "/addfacility";
    } else if (userRole === "admin") {
      window.location.href = "/dashboard";
    } else if (userRole !== undefined) {
      window.location.href = "/auth/login";
    }
  }, [userRole]);

  return <LoginForm />;
};

export default LoginPage;
