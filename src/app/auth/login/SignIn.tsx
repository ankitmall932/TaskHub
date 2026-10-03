'use client';

import { signIn } from "@/app/actions/auth/auth-actions";
import { socialLogin } from "@/lib/auth/social-login";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";



export default function SignIn ()
{
    const [ state, formAction, isPending ] = useActionState( signIn, { success: false, message: '' } );
    return (
        <div className="h-full w-full flex justify-center items-center ">
            <form action={ formAction } className="h-full w-120 flex flex-col gap-3 justify-center py-10 items-center p-2 border border-gray-200 rounded-2xl">
                <h1 className="text-2xl font-semibold">Sign Up to TaskHub</h1>
                { !state.success && state.message && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex">
                            <div className="shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" >
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-800">{ state.message }</p>
                            </div>
                        </div>
                    </div>
                ) }
                <div className="flex flex-col gap-2 w-full sm:w-77" >
                    <div onClick={ () => { void socialLogin( 'google' ); } }
                        className="border p-2 flex flex-row gap-5 rounded-2xl justify-center  items-center border-gray-300 cursor-pointer">
                        <Image src='/google.png' alt="google" width={ 25 } height={ 10 } />
                        <span>Continue with Google</span>
                    </div>
                    <div onClick={ () => { void socialLogin( 'github' ); } }
                        className="border p-2 flex flex-row gap-5 rounded-2xl justify-center items-center border-gray-300 cursor-pointer">
                        <Image src='/github.png' alt="github" width={ 30 } height={ 10 } />
                        <span>Continue with GitHub</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-77  ">
                    <div className=" h-px flex-1 bg-gray-200"></div>
                    <div className="text-gray-500">or</div>
                    <div className=" h-px flex-1 bg-gray-200"></div>
                </div>
                <div className="w-full sm:w-77  flex flex-col gap-2">
                    <div>
                        <input className="bg-gray-100 p-3 w-full rounded-2xl " placeholder="Please enter your email" name="email" type="email" autoComplete="email" required />
                    </div>
                    <div>
                        <input className="bg-gray-100 p-3 w-full rounded-2xl " placeholder="Please enter your password" name="password" type="password" autoComplete="new-password" required minLength={ 8 } />
                    </div>
                    <div className="flex items-center justify-end">
                        <button className={ `bg-sky-500 p-2 rounded-2xl text-white w-fit cursor-pointer ${ isPending && 'opacity-50 cursor-not-allowed' }` } type="submit" disabled={ isPending }>
                            { isPending ? "Login...." : "Login" }
                        </button>
                    </div>
                    <div className="flex flex-row gap-1 mt-2">
                        <h3>Don&apos;t have an Account ? </h3><Link className="text-blue-400 " href={ `/auth/signup` }>Sign Up</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
