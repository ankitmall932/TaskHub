import EditNameForm from "@/app/user/account/edit-name/EditNameForm";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditNamePage ()
{
    const session = await getSession();
    if ( !session )
    {
        redirect( "/" );
    }

    return (
        <main className="mx-auto flex w-full max-w-lg flex-col gap-6 rounded-2xl bg-white p-6 shadow-lg">
            <h1 className="text-2xl font-semibold">Edit name</h1>
            <EditNameForm currentName={ session.user.name } />
            <Link href="/user/account" className="w-fit text-sky-700 underline">
                Back to account
            </Link>
        </main>
    );
}
