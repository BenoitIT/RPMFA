import React from 'react'
import LoginForm from '@/app/(components)/auth/login-form'
import { auth, signOut } from "@/auth"

const LoginPage = async () => {
  const session: any = await auth();
  const userRole:any = JSON.stringify(session?.user?.role);
  
  return (
    <LoginForm userRole={userRole}/>
  )
}

export default LoginPage