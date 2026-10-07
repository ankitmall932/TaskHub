import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Password ()
{
    const accounts = await auth.api.listUserAccounts( { headers: await headers() } );
    const hasCredentialAccount = accounts.some( ( account ) => account.providerId === "credential" );
    const href = hasCredentialAccount
        ? "/user/account/change-password"
        : "/user/account/set-password";
    const label = hasCredentialAccount ? "Change password" : "Set password";

    return (
        <Link href={ href } className="rounded-lg bg-gray-500 p-2 text-white">
            { label }
        </Link>
    );
}
