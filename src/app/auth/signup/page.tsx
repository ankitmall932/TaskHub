import { getSession } from "@/lib/auth/get-session";
import SignUp from "./SignUp";
import { redirect } from "next/navigation";

export default async function SignupPage ()
{
    const session = await getSession();
    if ( session )
    {
        redirect( '/user/dashboard' );
    }
    return (
        <div>
            <SignUp />
        </div>
    );
}