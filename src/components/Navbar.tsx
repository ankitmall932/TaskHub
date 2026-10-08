'use client';

import { auth } from "@/lib/auth/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Session = typeof auth.$Infer.Session;

const navItems = [
    { label: "Dashboard", href: "/user/dashboard" },
    { label: "Spaces", href: "/user/spaces" },
    { label: "Task", href: "/user/task" },
    { label: "Sheet", href: "/user/time-sheet" },
];

export default function Navbar ( { session }: { session: Session | null; } )
{
    const pathname = usePathname();
    const [ menuOpen, setMenuOpen ] = useState( false );
    const userName = session?.user?.name?.[ 0 ]?.toUpperCase() ?? 'U';
    const image = session?.user?.image;
    const user = session?.user;

    const linkClass = ( href: string ) => pathname === href
        ? "text-blue-500 underline underline-offset-4"
        : "hover:text-blue-500 hover:underline hover:underline-offset-4";

    return (
        <nav className="relative flex min-h-15 w-full items-center justify-between rounded-2xl border border-white/30 bg-white/40 px-4 shadow-[0_0_25px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:px-5">
            <Link href={ user ? "/user/dashboard" : "/" } aria-label="TaskHub home">
                <Image src="/taskhub.png" width={ 150 } height={ 40 } alt="TaskHub" priority className="h-auto w-30 sm:w-37.5" />
            </Link>
            <div className="hidden items-center gap-5 lg:flex">
                { user ? (
                    <>
                        { navItems.map( ( item ) => (
                            <Link key={ item.href } className={ linkClass( item.href ) } href={ item.href }>
                                { item.label }
                            </Link>
                        ) ) }
                        <Link href="/user/account" aria-label="Open account" className="inline-flex items-center justify-center overflow-hidden rounded-full shadow-sm ring-2 ring-white/80" >
                            { image ? (
                                <Image src={ image } alt="Account avatar" width={ 40 } height={ 40 } className="h-10 w-10 rounded-full object-cover" />
                            ) : (
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                                    { userName }
                                </span>
                            ) }
                        </Link>
                    </>
                ) : (
                    <>
                        <Link className="rounded-lg bg-gray-300 px-3 py-2 font-semibold text-black" href="/auth/login">Login</Link>
                        <Link className="rounded-lg bg-black px-3 py-2 font-semibold text-white" href="/auth/signup">Sign Up</Link>
                    </>
                ) }
            </div>

            <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-800 transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
                aria-label={ menuOpen ? "Close navigation menu" : "Open navigation menu" }
                aria-expanded={ menuOpen }
                aria-controls="mobile-navigation"
                onClick={ () => setMenuOpen( !menuOpen ) }
            >
                <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    { menuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    ) }
                </svg>
            </button>
            { menuOpen && (
                <div id="mobile-navigation" className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 flex flex-col gap-2 rounded-2xl border border-white/30 bg-white/95 p-4 shadow-xl backdrop-blur-2xl lg:hidden">
                    { user ? (
                        <>
                            { navItems.map( ( item ) => (
                                <Link key={ item.href } className={ `rounded-lg px-3 py-2 ${ linkClass( item.href ) }` } href={ item.href }
                                    onClick={ () => setMenuOpen( false ) } >{ item.label } </Link>
                            ) ) }
                            <Link href="/user/account" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-black/5"
                                onClick={ () => setMenuOpen( false ) } >
                                { image ? (
                                    <Image src={ image } alt="" width={ 36 } height={ 36 } className="h-9 w-9 rounded-full object-cover" />
                                ) : (
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                                        { userName }
                                    </span>
                                ) }
                                <span>Account</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className="rounded-lg bg-gray-200 px-3 py-2 text-center font-semibold text-black" href="/auth/login"
                                onClick={ () => setMenuOpen( false ) } >Login</Link>
                            <Link className="rounded-lg bg-black px-3 py-2 text-center font-semibold text-white" href="/auth/signup"
                                onClick={ () => setMenuOpen( false ) } > Sign Up</Link>
                        </>
                    ) }
                </div>
            ) }
        </nav>
    );
}
