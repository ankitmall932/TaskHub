import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";


export default async function UserLayout ( { children }: { children: React.ReactNode; } )
{
    const session = await getSession();
    if ( !session )
    {
        redirect( '/' );
    }
    return (
        <>{ children }</>
    );
}