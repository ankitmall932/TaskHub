'use client';

import { createSpace } from "@/app/actions/user/user-actions";
import Link from "next/link";
import { useActionState } from "react";

export default function Create ()
{
    const [ state, formAction, isPending ] = useActionState( createSpace, { success: false, message: '' } );
    return (
        <>
            <div className="h-full w-full flex justify-center items-center ">
                <form action={ formAction } className="h-full w-120 flex flex-col gap-3 justify-center py-10 items-center p-2 border border-gray-200 rounded-2xl">
                    { state.message && (
                        <p role={ state.success ? "status" : "alert" } className={ state.success ? "text-green-700" : "text-red-700" }>
                            { state.message }
                        </p>
                    ) }
                    <input className="p-3 w-full h-full border border-gray-400 rounded-2xl" type="text" name="name" placeholder="Enter your space name" required />
                    <button className={ `bg-sky-500 p-2 rounded-2xl text-white w-fit cursor-pointer ${ isPending && 'opacity-50 cursor-not-allowed' }` } type="submit" disabled={ isPending }>
                        { isPending ? "Creating...." : "Create" }
                    </button>
                    <div className="h-full w-full ">
                        <Link href="/user/spaces" className=" text-sky-700 underline ">
                            Back to Spaces
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
