'use client';

import { createTask } from "@/app/actions/user/task-actions";
import { useActionState } from "react";

export default function Create ( { id }: { id: string; } )
{
    const spaceId = id;
    const addTaskWithId = createTask.bind( null, spaceId );
    const [ state, formAction, isPending ] = useActionState( addTaskWithId, { success: false, message: '' } );
    return (
        <div className="h-full w-full flex justify-center items-center">
            <form action={ formAction } className="h-full w-full max-w-xl flex flex-col gap-3 justify-center items-center p-2 border border-gray-200 rounded-2xl">
                <h1 className="text-2xl font-bold">Create Your Task Here</h1>
                { state?.message && (
                    <p role={ state.success ? 'status' : 'alert' } className={ state.success ? 'text-green-700' : 'text-red-600' }>{ state.message }</p>
                ) }
                <input className="p-3 w-full h-full border border-gray-400 rounded-2xl" type="text" name="topic" placeholder="Please enter your topic" required />
                <input className="p-3 w-full h-full border border-gray-400 rounded-2xl" type="text" name="heading" placeholder="Please enter your Topic Detail" required />
                <select className="p-3 w-full h-full border pr-5 border-gray-400 rounded-2xl" required defaultValue={ 'none' } name="priority">
                    <option value="none">Please Select the Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <div className="flex w-full items-center gap-3">
                    <label htmlFor="startDate" className="min-w-22.5 text-sm font-medium text-gray-700">Start Date </label>
                    <input className="p-3 flex-1 h-full border border-gray-400 rounded-2xl" id="startDate" type="date" name="start" required />
                </div>
                <div className="flex w-full items-center gap-3">
                    <label htmlFor="due-date" className="min-w-22.5 text-sm font-medium text-gray-700">Due Date </label>
                    <input className="p-3 flex-1 h-full border border-gray-400 rounded-2xl" type="date" name="due" id="due-date" required />
                </div>
                <button className={ `p-3 bg-green-600 text-white rounded-2xl cursor-pointer ${ isPending && 'opacity-50 cursor-not-allowed' }` }>
                    { isPending ? 'Submitting...' : 'Submit' }
                </button>
            </form>
        </div>
    );
}
