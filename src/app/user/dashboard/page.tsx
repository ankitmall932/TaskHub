import { countAll } from "@/app/actions/user/dashboard-action";
import Graph from "./Graph";
import Today from "./Today";
import Top from "./Top";


export default async function Dashboard ()
{
    const count = await countAll();
    if ( !count.success )
    {
        return <p>{ count.message }</p>;
    }
    const result = count.data;
    if ( !result )
    {
        return null;
    }
    const { countStatusTask } = result;
    const inprogress = countStatusTask.find( ( t ) => t.status === 'InProgress' )?._count._all ?? 0;
    const completed = countStatusTask.find( ( t ) => t.status === 'Completed' )?._count._all ?? 0;
    const pending = countStatusTask.find( ( t ) => t.status === 'Pending' )?._count._all ?? 0;
    return (
        <>
            <div className="flex flex-col border border-gray-500 p-1 rounded-2xl h-full w-full">
                <h1 className="text-center text-2xl font-bold mt-3">Overview</h1>
                <h2 className="text-center text-sm font-semibold mb-3">Monitor all of your tasks here</h2>
                <Top />
                <h1 className="text-center text-2xl font-bold">Today&apos;s Task</h1>
                <Today />
                <h1 className="text-center text-2xl font-bold mt-5">Overall Task Status</h1>
                <Graph inProgress={ inprogress } completed={ completed } pending={ pending } />
            </div>
        </>
    );
}