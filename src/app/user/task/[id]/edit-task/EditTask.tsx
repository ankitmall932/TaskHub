'use client';

import { editTask } from "@/app/actions/user/task-actions";
import { useActionState } from "react";


type Status = 'Pending' | 'InProgress' | 'Completed';

export default function EditTask ( { id, task }: { id: string, task: { topic: string, heading: string, status: Status; }; } )
{
    const editWithTask = editTask.bind( null, id );
    const [ state, formAction, isPending ] = useActionState( editWithTask, { success: false, message: '' } );
    return (
        <div className="h-full w-full flex justify-center items-center">
            <form action={ formAction } className="h-full w-full max-w-xl flex flex-col gap-3 justify-center items-center p-2 border border-gray-200 rounded-2xl">
                <h1 className="text-2xl font-bold">Create Your Task Here</h1>
                { !state?.success && state?.message && (
                    <p role={ state.success ? 'status' : 'alert' } className={ state.success ? 'text-green-700' : 'text-red-600' }>{ state.message }</p>
                ) }
                <input className="p-3 w-full h-full border border-gray-400 rounded-2xl" type="text" name="topic" placeholder="Please enter your topic" defaultValue={ task.topic } required />
                <input className="p-3 w-full h-full border border-gray-400 rounded-2xl" type="text" name="heading" placeholder="Please enter your Topic Detail" defaultValue={ task.heading } required />
                <select className="p-3 w-full h-full border pr-5 border-gray-400 rounded-2xl" required defaultValue={ task.status } name="status">
                    <option value="Pending">Pending</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button className={ `p-3 bg-green-600 text-white rounded-2xl cursor-pointer ${ isPending && 'opacity-50 cursor-not-allowed' }` }>
                    { isPending ? 'Submitting...' : 'Submit' }
                </button>
            </form>
        </div>
    );
}
