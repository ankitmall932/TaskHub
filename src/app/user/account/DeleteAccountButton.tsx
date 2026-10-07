"use client";

import { useState } from "react";
import { deleteAccount } from "@/app/actions/auth/auth-actions";

export default function DeleteAccountButton ()
{
    const [ isDeleting, setIsDeleting ] = useState( false );
    const [ error, setError ] = useState<string | null>( null );

    async function handleDelete ()
    {
        const confirmed = window.confirm(
            "Deleting your account is permanent. Your account and associated data will be deleted, and this action cannot be undone. Do you want to continue?"
        );
        if ( !confirmed ) return;

        setIsDeleting( true );
        setError( null );
        try
        {
            const result = await deleteAccount();
            if ( result && !result.success )
            {
                setError( result.message );
                setIsDeleting( false );
            }
        }
        catch ( error )
        {
            setError( error instanceof Error ? error.message : "Unable to delete account." );
            setIsDeleting( false );
        }
    }

    return (
        <>
            <button
                onClick={ handleDelete }
                type="button"
                disabled={ isDeleting }
                className="rounded-lg bg-red-600 cursor-pointer p-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
                { isDeleting ? "Deleting..." : "Delete Account" }
            </button>
            { error && <p role="alert" className="w-full text-center text-sm text-red-600">{ error }</p> }
        </>
    );
}
