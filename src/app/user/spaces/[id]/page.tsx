import { getDetailSpace } from "@/app/actions/user/user-actions";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import SpaceTask from "./SpaceTask";



export default async function DetailSpaces ( { params }: { params: Promise<{ id: string; }>; } )
{
    const { id } = await params;
    const user = await getDetailSpace( id );

    if ( !user.success || !user.data )
    {
        return <div>{ user.message ?? 'Space not found' }</div>;
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-wrap sm:gap-10 gap-2 justify-center items-center w-full bg-gray-200 p-3 rounded-2xl font-semibold">
                <h1 className="text-2xl">{ user.data.name }</h1>
                <div className="flex flex-row gap-5 items-center">
                    <Link href={ `/user/spaces/${ id }/edit` } aria-label="Edit space">
                        <Edit />
                    </Link>
                    <DeleteButton id={ id } />
                </div>
                <div className="fixed bottom-20 sm:right-20 right-10 ">
                    <Link href={ `/user/spaces/${ id }/create-task` }><Plus className="bg-blue-500 p-3 text-white rounded-xl hover:scale-105 active:scale-95 duration-200" size={ 56 } color="white" strokeWidth={ 2.5 } /></Link>
                </div>
            </div>
            <SpaceTask id={ id } />
        </div>
    );
}
