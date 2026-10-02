'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar ()
{
    const pathname = usePathname();
    return (
        <>
            <div className="h-15 flex flex-row justify-between px-5 items-center w-full bg-white/40 backdrop-blur-2xl border border-white/30  shadow-[0_0_25px_rgba(0,0,0,0.08)] rounded-2xl ">
                <Link href={ '/' }>
                    <Image src="/taskhub.png" width={ 150 } height={ 20 } alt="main image" loading="eager" />
                </Link>
                <div className="flex flex-row gap-5">
                    <Link className='px-2 py-1 bg-gray-300 text-black rounded-lg font-semibold' href={ '/auth/login' }>Login</Link>
                    <Link className='px-2 py-1 bg-black text-white rounded-lg font-semibold' href={ '/auth/signup' }>Sign Up</Link>
                    <Link className={ pathname === '/user/dashboard' ? 'text-blue-500 underline underline-offset-4 ' : 'hover:underline hover:underline-offset-4 hover:text-blue-500 ' } href={ '/user/dashboard' }>Dashboard</Link>
                    <Link className={ pathname === '/user/create-task' ? 'text-blue-500 underline underline-offset-4 ' : 'hover:underline hover:underline-offset-4 hover:text-blue-500 ' } href={ '/user/create-task' }>Create</Link>
                    <Link className={ pathname === '/user/task' ? 'text-blue-500 underline underline-offset-4 ' : 'hover:underline hover:underline-offset-4 hover:text-blue-500 ' } href={ '/user/task' }>Task</Link>
                    <Link className={ pathname === '/user/time-sheet' ? 'text-blue-500 underline underline-offset-4 ' : 'hover:underline hover:underline-offset-4 hover:text-blue-500 ' } href={ '/user/time-sheet' }>Sheet</Link>
                </div>
            </div>
        </>
    );
}