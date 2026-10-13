'use client';

import { deleteTask } from "@/app/actions/user/task-actions";

export default function Delete ( { id, spaceId }: { id: string, spaceId: string; } )
{
    const handleDelete = () =>
    {
        const confirm = window.confirm( 'Are you sure want to delete the task' );
        if ( confirm )
        {
            void deleteTask( id, spaceId );
        }
    };
    return (
        <div>
            <div onClick={ handleDelete } className={ `bg-red-100 text-red-500  font-semibold p-2 rounded-lg cursor-pointer ` }>Delete</div>
        </div>
    );
}
