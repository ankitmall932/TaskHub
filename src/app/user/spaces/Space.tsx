import { getSpaces } from "@/app/actions/user/user-actions";
import { FolderOpen } from "lucide-react";
import Link from "next/link";

export default async function Space ()
{
    const response = await getSpaces();
    if ( !response.success )
    {
        return <p>{ response.message }</p>;
    }
    const spaces = response.data ?? [];
    if ( spaces.length === 0 )
    {
        return (
            <div className="h-full w-full flex justify-center items-center">
                <div>No Space found</div>
            </div>
        );
    }
    return (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
            { spaces.map( ( space ) => (
                <Link href={ `/user/spaces/${ space.id }` } className="border  border-black p-3 rounded-2xl text-center" key={ space.id }>
                    <h1 className="flex gap-5 font-semibold"><FolderOpen color="#1ec832" />{ space.name }</h1>
                </Link>
            ) ) }
        </div>
    );
}
