'use client';

import { editSpace } from "@/app/actions/user/user-actions";
import Link from "next/link";
import { useActionState } from "react";

export default function EditForm ( { id, user }: { id: string, user: { name: string; }; } )
{
    const userId = id;
    const editWithId = editSpace.bind( null, userId );
    const [ state, formAction, isPending ] = useActionState( editWithId, { success: false, message: '' } );
    return (
        <div className="h-full w-full flex justify-center items-center ">
            <form action={ formAction } className="h-full w-120 flex flex-col gap-3 justify-center py-10 items-center p-2 border border-gray-200 rounded-2xl">
                { state?.success && state?.message && (
                    <p role={ state?.success ? "status" : "alert" } className={ state?.success ? "text-green-700" : "text-red-700" }>
                        { state?.message }
                    </p>
                ) }
                <input className="p-3 w-full h-full border border-gray-400 rounded-2xl" type="text" name="name" defaultValue={ user.name } placeholder="Enter your space name" required />
                <button className={ `bg-sky-500 p-2 rounded-2xl text-white w-fit cursor-pointer ${ isPending && 'opacity-50 cursor-not-allowed' }` } type="submit" disabled={ isPending }>
                    { isPending ? "Updating...." : "Update" }
                </button>
                <div className="h-full w-full ">
                    <Link href={ `/user/spaces/${ id }` } className=" text-sky-700 underline ">
                        Back to Details
                    </Link>
                </div>
            </form>
        </div>
    );
}
