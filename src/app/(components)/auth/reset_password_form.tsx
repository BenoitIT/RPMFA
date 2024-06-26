import Link from "next/link";
import Image from "next/image";
import Footer from "../navigations/Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { useForm } from 'react-hook-form';
import { startTransition, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ResetPasswordSchemaForm } from "@/app/schemas";
import { reset } from "@/app/actions/reset";
import { SuccessModal } from "../modals/SuccessModal";

const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [pending, setPending] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const form = useForm<z.infer<typeof ResetPasswordSchemaForm>>({
        resolver: zodResolver(ResetPasswordSchemaForm),
        defaultValues: {
            password: '',
            confirm_password: ''
        },
    });

    const onSubmit = (values: z.infer<typeof ResetPasswordSchemaForm>) => {
        setPending(true);
        startTransition(() => {
            reset(values, token)
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
            toast.success("Password reseted!");
            setSuccess('');
        }
    }, [success, router]);

    useEffect(() => {
        if (!pending && !error && success) {
            setIsSuccessModalOpen(true);
        }
    }, [pending, error, success, router]);

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
            <h1 className="text-xl mt-0 font-medium text-center py-4 leading-tight tracking-tight text-blue-600 md:text-2xl lg:text-3xl">
                Create New Password
            </h1>
            <div className="w-full bg-white rounded-lg shadow dark:border my-3 sm:max-w-lg xl:p-0 border border-blue-100 m-3">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form className="space-y-4 md:space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="relative w-full">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                disabled={pending}
                                placeholder="Enter password here"
                                {...form.register('password')}
                                className="bg-green-50 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2 md:p-2.5 placeholder:text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 top-[35%] pr-3 flex items-center text-gray-700"
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                            </button>
                            {form.formState.errors.password && <p className="text-red-500 text-xs">{form.formState.errors.password.message}</p>}
                        </div>
                        <div className="relative w-full">
                            <label htmlFor="confirm_password" className="text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                disabled={pending}
                                placeholder="Confirm password"
                                {...form.register('confirm_password')}
                                className="bg-green-50 outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2 md:p-2.5 placeholder:text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 top-[35%] pr-3 flex items-center text-gray-700"
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                            </button>
                            {form.formState.errors.confirm_password && <p className="text-red-500 -mt-0 text-xs">{form.formState.errors.confirm_password.message}</p>}

                        </div>
                        <div className="flex flex-col space-y-2">
                            <button
                                type="submit"
                                disabled={
                                    pending ||
                                    !form.formState.isValid ||
                                    form.watch('password') !== form.watch('confirm_password')
                                }
                                className={` ${pending || !form.formState.isValid || form.watch('password') !== form.watch('confirm_password')
                                    ? 'cursor-not-allowed opacity-40' : ''} w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <SuccessModal open={isSuccessModalOpen} handleOpen={setIsSuccessModalOpen} message="Password reset successfully." NextPath="login" />
        </main>
    );
};

export default ResetPasswordForm;
