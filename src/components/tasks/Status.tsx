'use client';

import { updateStatus } from "@/app/actions/user/task-actions";
import { useState } from "react";

type TaskStatus = 'Pending' | 'InProgress' | 'Completed';

export default function Status ( { task, id }: { task: TaskStatus; id: string; } )
{
    const [ status, setStatus ] = useState( task );
    const [ isUpdating, setIsUpdating ] = useState( false );

    const handleClick = async () =>
    {
        let nextStatus = status;
        if ( status === 'Pending' )
        {
            nextStatus = 'InProgress';
        } else if ( status === 'InProgress' )
        {
            nextStatus = 'Completed';
        } else if ( status === 'Completed' )
        {
            if ( !window.confirm( 'Do you really want to restart the process' ) )
            {
                return;
            }
            nextStatus = 'Pending';
        }
        setIsUpdating( true );
        try
        {
            const result = await updateStatus( id, nextStatus );
            if ( !result.success )
            {
                window.alert( result.message );
                return;
            }
            setStatus( nextStatus );
        } catch ( error )
        {
            window.alert( error instanceof Error ? error.message : 'Unable to update task status' );
        } finally
        {
            setIsUpdating( false );
        }
    };
    return (
        <div>
            <button type="button" onClick={ handleClick } disabled={ isUpdating } className={ `p-2 rounded-lg cursor-pointer disabled:cursor-wait disabled:opacity-60 ${ status === 'Pending' && 'bg-amber-100 text-amber-700 font-semibold' } ${ status === 'InProgress' && 'bg-blue-100 text-blue-700 font-semibold' } ${ status === 'Completed' && 'bg-green-100 text-green-700 font-semibold' }` }>
                { isUpdating ? 'Updating...' : status }
            </button>
        </div>
    );
}
