"use client";

import { updateAccountName } from "@/app/actions/auth/auth-actions";
import { useActionState } from "react";

export default function EditNameForm ( { currentName }: { currentName: string; } )
{
    const [ state, formAction, isPending ] = useActionState(
        updateAccountName,
        { success: false, message: "" }
    );

    return (
        <form action={ formAction } className="flex w-full flex-col gap-4">
            <label htmlFor="name" className="flex flex-col gap-1">
                Name
                <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    defaultValue={ currentName }
                    minLength={ 2 }
                    maxLength={ 100 }
                    required
                    className="rounded-lg border border-gray-300 p-3"
                />
            </label>
            { state.message && (
                <p role={ state.success ? "status" : "alert" } className="text-red-700">
                    { state.message }
                </p>
            ) }
            <button
                type="submit"
                disabled={ isPending }
                className="w-fit rounded-lg bg-sky-600 px-4 py-2 text-white disabled:opacity-60"
            >
                { isPending ? "Saving..." : "Save name" }
            </button>
        </form>
    );
}
