import { countAll } from "@/app/actions/user/dashboard-action";
import { Calendar, CheckCheck, CircleDashed, FileWarning, Link2, LoaderCircle } from "lucide-react";
import Link from "next/link";

export default async function Top ()
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
    const { countAllTask, countStatusTask, countOverdueTask } = result;
    const inprogress = countStatusTask.find( ( t ) => t.status === 'InProgress' )?._count._all ?? 0;
    const completed = countStatusTask.find( ( t ) => t.status === 'Completed' )?._count._all ?? 0;
    const pending = countStatusTask.find( ( t ) => t.status === 'Pending' )?._count._all ?? 0;
    return (
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-2 gap-1 mb-10 border border-gray-500 rounded-2xl sm:p-2 p-1">
            <div className="p-4 border h-35 flex flex-col justify-between  border-gray-400 shadow-xs rounded-xl">
                <div className="flex flex-row justify-between items-center">
                    <div className="p-2 border border-gray-400 rounded-xl shadow-xs"><Calendar size={ 15 } color="green" /></div>
                    <Link href={ `/user/task` } className="p-2 border border-gray-400 rounded-xl shadow-xs"><Link2 size={ 15 } /></Link>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className=" text-gray-400 px-2">Total</div>
                    <div className="text-2xl font-semibold px-2">{ countAllTask }</div>
                </div>
            </div>
            <div className="p-4 border h-35 flex flex-col justify-between  border-gray-400 shadow-xs rounded-xl">
                <div className="flex flex-row justify-between items-center">
                    <div className="p-2 border border-gray-400 rounded-xl shadow-xs"><CircleDashed size={ 15 } color="green" /></div>
                    <Link href={ `/user/dashboard/pending` } className="p-2 border border-gray-400 rounded-xl shadow-xs"><Link2 size={ 15 } /></Link>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className=" text-gray-400 px-2">Pending</div>
                    <div className="text-2xl font-semibold px-2">{ pending }</div>
                </div>
            </div>
            <div className="p-4 border h-35 flex flex-col justify-between  border-gray-400 shadow-xs rounded-xl">
                <div className="flex flex-row justify-between items-center">
                    <div className="p-2 border border-gray-400 rounded-xl shadow-xs"><LoaderCircle size={ 15 } color="green" /></div>
                    <Link href={ `/user/dashboard/in-progress` } className="p-2 border border-gray-400 rounded-xl shadow-xs"><Link2 size={ 15 } /></Link>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className=" text-gray-400 px-2">InProgress</div>
                    <div className="text-2xl font-semibold px-2">{ inprogress }</div>
                </div>
            </div>
            <div className="p-4 border h-35 flex flex-col justify-between  border-gray-400 shadow-xs rounded-xl">
                <div className="flex flex-row justify-between items-center">
                    <div className="p-2 border border-gray-400 rounded-xl shadow-xs"><CheckCheck size={ 15 } color="green" /></div>
                    <Link href={ `/user/dashboard/completed` } className="p-2 border border-gray-400 rounded-xl shadow-xs"><Link2 size={ 15 } /></Link>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className=" text-gray-400 px-2">Completed</div>
                    <div className="text-2xl font-semibold px-2">{ completed }</div>
                </div>
            </div>
            <div className="p-4 border h-35 flex flex-col justify-between  border-red-500 bg-red-50 shadow-xs rounded-xl">
                <div className="flex flex-row justify-between items-center">
                    <div className="p-2 border border-gray-400 rounded-xl shadow-xs"><FileWarning size={ 15 } color="red" /></div>
                    <Link href={ `/user/dashboard/over-due` } className="p-2 border border-gray-400 rounded-xl shadow-xs"><Link2 size={ 15 } /></Link>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className=" text-gray-400 px-2">OverDue</div>
                    <div className="text-2xl font-semibold px-2">{ countOverdueTask }</div>
                </div>
            </div>
        </div>
    );
}
