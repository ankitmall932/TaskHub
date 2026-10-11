'use client';

import { deleteSpace } from "@/app/actions/user/user-actions";
import { Trash2 } from "lucide-react";

export default function DeleteButton ( { id }: { id: string; } )
{
    function handleDelete ()
    {
        const confirmed = window.confirm(
            "Are you sure you want to delete this space? This action cannot be undone."
        );
        if ( confirmed )
        {
            void deleteSpace( id );
        }
    }

    return (
        <div>
            <button type="button" aria-label="Delete space" className="cursor-pointer" onClick={ handleDelete }><Trash2 /></button>
        </div>
    );
}
