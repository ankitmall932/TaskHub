"use client";

import { setAccountPassword } from "@/app/actions/auth/auth-actions";
import { useActionState } from "react";

export default function SetPasswordForm ()
{
    const [ state, formAction, isPending ] = useActionState(
        setAccountPassword,
        { success: false, message: "" }
    );

    return (
        <form action={ formAction } className="flex w-full flex-col gap-4">
            <label className="flex flex-col gap-1">
                New password
                <input
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    minLength={ 8 }
                    required
                    className="rounded-lg border border-gray-300 p-3"
                />
            </label>
            <label className="flex flex-col gap-1">
                Confirm password
                <input
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    minLength={ 8 }
                    required
                    className="rounded-lg border border-gray-300 p-3"
                />
            </label>
            { state.message && (
                <p role={ state.success ? "status" : "alert" } className={ state.success ? "text-green-700" : "text-red-700" }>
                    { state.message }
                </p>
            ) }
            <button
                type="submit"
                disabled={ isPending }
                className="w-fit rounded-lg bg-sky-600 px-4 py-2 text-white disabled:opacity-60"
            >
                { isPending ? "Setting..." : "Set password" }
            </button>
        </form>
    );
}
