import { auth, signOut } from "@/auth"
import Link from "next/link";

const Settings = async () => {
  const session: any = await auth();
  const userRole = JSON.stringify(session?.user?.role);
  return (
    <div className="flex w-full min-h-screen space-y-9 flex-col justify-center items-center text-center text-lg">
      {JSON.parse(userRole)}
      <form action={
        async () => {
          'use server'
          await signOut();
        }
      }>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >Sign Out</button>
        <Link
          className="text-blue-500 hover:text-blue-600 focus:outline-none absolute top-0 left-0 p-4"
          href="/"
        >
          Go back to home
        </Link>
      </form>
    </div>
  )
}

export default Settings