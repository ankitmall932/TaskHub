import { getTaskBySpace } from "@/app/actions/user/task-actions";
import Delete from "@/components/tasks/Delete";
import Status from "@/components/tasks/Status";
import Link from "next/link";

export default async function SpaceTask ( { id }: { id: string; } )
{
    const response = await getTaskBySpace( id );
    if ( !response.success )
    {
        return <p>{ response.message }</p>;
    }
    const data = response.data ?? [];
    if ( data.length === 0 )
    {
        return (
            <div className="h-full w-full flex justify-center items-center">
                <div>No Task Found for The given Space</div>
            </div>
        );
    }
    return (
        <div className={ `h-full w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5` }>
            { data.map( ( task ) => (
                <div key={ task.id } className={ `h-full w-full p-5 shadow-sm flex flex-col gap-5  ${ task.overDue ? 'bg-red-200 border-2 border-red-500 rounded-2xl' : 'bg-gray-50 border-2 border-gray-400 rounded-2xl' }` }>
                    <div className="flex flex-row items-center justify-around text-xs">
                        <div className={ `p-2 rounded-lg cursor-not-allowed ${ task.priority === 'Medium' && 'bg-yellow-100 text-yellow-500 font-semibold' } ${ task.priority === 'High' && 'bg-red-100 text-red-500 font-semibold' } ${ task.priority === 'Low' && 'bg-gray-200 text-gray-600 font-semibold' }` }>{ task.priority }</div>
                        <div>
                            <Status task={ task.status } id={ task.id } />
                        </div>
                        <div>
                            <Link href={ `/user/task/${ task.id }/edit-task` } className='bg-blue-100 text-blue-700 font-semibold p-2 rounded-lg cursor-pointer'>Edit</Link>
                        </div>
                        <div>
                            <Delete id={ task.id } spaceId={ task.spaceId } />
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="text-xl font-semibold">Topic:  { task.topic }</div>
                        <div className="text-sm font-semibold">Heading:  { task.heading }</div>
                        <div className="text-sm font-semibold">Start-Date:  { task.start.toLocaleDateString( 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' } ) }</div>
                        <div className="text-sm font-semibold">Due-Date: { task.due.toLocaleDateString( 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' } ) }</div>
                    </div>
                </div>
            ) )
            }
        </div >
    );
}
