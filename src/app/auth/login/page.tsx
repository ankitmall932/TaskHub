import { getSession } from "@/lib/auth/get-session";
import SignIn from "./SignIn";
import { redirect } from "next/navigation";


export default async function Login ()
{
    const session = await getSession();
    if ( session )
    {
        redirect( '/user/dashboard' );
    }
    return (
        <>
            <div>
                <SignIn />
            </div>
        </>
    );
}