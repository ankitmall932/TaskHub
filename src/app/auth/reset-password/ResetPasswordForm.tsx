"use client";

import { resetAccountPassword } from "@/app/actions/auth/auth-actions";
import { useActionState } from "react";
import Link from "next/link";

export default function ResetPasswordForm ( { token }: { token: string; } )
{
    const [ state, formAction, isPending ] = useActionState(
        resetAccountPassword,
        { success: false, message: "" }
    );

    return (
        <form action={ formAction } className="flex w-full flex-col gap-4">
            <input type="hidden" name="token" value={ token } />
            <label htmlFor="newPassword" className="flex flex-col gap-1">
                New password
                <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    minLength={ 8 }
                    required
                    className="rounded-lg border border-gray-300 p-3"
                />
            </label>
            <label htmlFor="confirmPassword" className="flex flex-col gap-1">
                Confirm new password
                <input
                    id="confirmPassword"
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
            { state.success ? (
                <Link href="/auth/login" className="w-fit rounded-lg bg-sky-600 px-4 py-2 text-white">
                    Go to login
                </Link>
            ) : (
                <button
                    type="submit"
                    disabled={ isPending }
                    className="w-fit rounded-lg bg-sky-600 px-4 py-2 text-white disabled:opacity-60"
                >
                    { isPending ? "Resetting..." : "Reset password" }
                </button>
            ) }
        </form>
    );
}
