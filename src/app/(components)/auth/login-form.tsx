'use client';
import Link from "next/link";
import Image from "next/image";
import Footer from "../navigations/Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { LoginSchema } from "@/app/schemas";
import { startTransition, useState, useEffect } from "react";
import { login } from "@/app/actions/login";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginForm = ({userRole}:any) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setPending(true);
    startTransition(() => {
      login(values)
        .then((data:any) => {
          setPending(false);
          setError(data?.error);
          setSuccess(data?.success);
          if(data?.success) window.location.reload();
        })
        .catch(() => {
          setPending(false);
          setError('Something went wrong, please try again.');
        });
    });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError('');
    }
  }, [error]);
  useEffect(() => {
    if (success) {
      setTimeout(() => window.location.reload(), 2000);
      setTimeout(() => {
      toast.success("Welcome back!");
      }, 4000);
      setSuccess('');
    }
  }, [success, router]);

  useEffect(() => {
    if(!pending && !error) {
      if(userRole && JSON.parse(userRole) === 'admin') router.push('/dashboard');
      if(userRole && JSON.parse(userRole) === 'member') router.push('/addfacility');
    }
  }
  , [pending, error,router, success, userRole]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white w-full">
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
          quality={100} />
      </Link>
      <h1 className="text-xl font-medium text-center py-4 leading-tight tracking-tight text-blue-600 md:text-2xl lg:text-3xl">
        Login
      </h1>
      <div className="w-full  bg-white rounded-lg shadow dark:border my-3 sm:max-w-lg xl:p-0 border border-blue-100 m-3">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-4 md:space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                disabled={pending}
                placeholder="Enter your email here"
                {...form.register('email')}
                className="bg-green-50 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2 md:p-2.5 placeholder:text-sm" />
              {form.formState.errors.email && <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>}
            </div>
            <div className="relative w-full">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                disabled={pending}
                placeholder="Enter password here"
                {...form.register('password')}
                className="bg-green-50 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2 md:p-2.5 placeholder:text-sm" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-[35%] pr-3 flex items-center text-gray-700"
              >
                {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
              </button>
            </div>
            {form.formState.errors.password && <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>}
            <div className="flex flex-col space-y-2">
              <button
                type="submit"
                disabled={pending
                  || !form.formState.isValid}
                className={` ${pending || !form.formState.isValid ? 'cursor-not-allowed opacity-40' : ''} w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                Login
              </button>
              <Link className="forgot-password flex text-blue-600 hover:text-blue-500 text-sm justify-end" href={"forgot_password"}>
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>

  );
};

export default LoginForm;
