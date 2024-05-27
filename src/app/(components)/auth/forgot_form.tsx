'use client';
import Link from "next/link";
import Image from "next/image";
import Footer from "../navigations/Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { ForgotSchema } from "@/app/schemas";
import { startTransition, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { forgot } from "@/app/actions/forgot";

const ForgotForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [pending, setPending] = useState(false);
    const form = useForm<z.infer<typeof ForgotSchema>>({
        resolver: zodResolver(ForgotSchema),
        defaultValues: {
            email: '',
        },
    });


    const onSubmit = (values: z.infer<typeof ForgotSchema>) => {
        setPending(true);
        startTransition(() => {
            forgot(values)
                .then((data: any) => {
                    setPending(false);
                    setError(data?.error);
                    setSuccess(data?.message);
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
    }, [error, router]);
    useEffect(() => {
        if (success) {
            toast.success("Reset link sent to your email!");
            setSuccess('');
        }
    }, [success, router]);

    useEffect(() => {
        if (!pending && !error && success) {
            router.push('reset_pswd_link');
        }
    }
        , [pending, error, success, router]);

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
            <h1 className="text-xl mt-10 font-medium text-center py-4 leading-tight tracking-tight text-blue-600 md:text-2xl lg:text-3xl">
                Forgot Password
            </h1>
            <p className="text-center text-sm text-gray-500">
                We will send reset instructions to your email
            </p>
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
                                className="bg-green-50 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2 md:p-2.5 placeholder:text-sm"
                            />
                        </div>
                        {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
                        <div className="flex flex-col space-y-2">
                            <button
                                type="submit"
                                disabled={pending}
                                className={` ${pending ? 'cursor-not-allowed opacity-40' : ''} w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                            >
                                Send Reset Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ForgotForm;
