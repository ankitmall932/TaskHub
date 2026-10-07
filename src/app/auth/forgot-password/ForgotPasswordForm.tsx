"use client";

import { requestPasswordReset } from "@/app/actions/auth/auth-actions";
import { useActionState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm ()
{
    const [ state, formAction, isPending ] = useActionState(
        requestPasswordReset,
        { success: false, message: "" }
    );

    return (
        <form action={ formAction } className="flex w-full flex-col gap-4">
            <label htmlFor="email" className="flex flex-col gap-1">
                Email address
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
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
                { isPending ? "Sending..." : "Send reset link" }
            </button>
            <Link href="/auth/login" className="w-fit text-sky-700 underline">
                Back to login
            </Link>
        </form>
    );
}
