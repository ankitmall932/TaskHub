import { getDetailSpace } from "@/app/actions/user/user-actions";
import { Edit } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";



export default async function DetailSpaces ( { params }: { params: Promise<{ id: string; }>; } )
{
    const { id } = await params;
    const user = await getDetailSpace( id );

    if ( !user.success || !user.data )
    {
        return <div>{ user.message ?? 'Space not found' }</div>;
    }

    return (
        <div className="flex flex-wrap sm:gap-10 gap-2 justify-center items-center w-full bg-gray-200 p-3 rounded-2xl font-semibold">
            <h1 className="text-2xl">{ user.data.name }</h1>
            <div className="flex flex-row gap-5 items-center">
                <Link href={ `/user/spaces/${ id }/edit` } aria-label="Edit space">
                    <Edit />
                </Link>
                <DeleteButton id={ id } />
            </div>
        </div>
    );
}
