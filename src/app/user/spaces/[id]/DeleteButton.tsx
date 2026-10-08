'use client';

import { deleteSpace } from "@/app/actions/user/user-actions";
import { Trash2 } from "lucide-react";

export default function DeleteButton ( { id }: { id: string; } )
{
    return (
        <div>
            <button className="cursor-pointer" onClick={ () => ( deleteSpace( id ) ) }><Trash2 /></button>
        </div>
    );
}
