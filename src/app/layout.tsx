import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from 'next-auth/react'
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "RPMFA",
  description: "Rwanda Private Medical Facilities Association",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-black`}>
        <SessionProvider>
        <ToastContainer position="top-right" />
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
