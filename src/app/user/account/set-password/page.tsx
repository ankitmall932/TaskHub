import SetPasswordForm from "@/app/user/account/set-password/SetPasswordForm";
import Link from "next/link";

export default function SetPasswordPage ()
{
    return (
        <main className="mx-auto flex w-full max-w-lg flex-col gap-6 rounded-2xl bg-white p-6 shadow-lg">
            <h1 className="text-2xl font-semibold">Set password</h1>
            <p className="text-sm text-gray-600">
                Add a password so you can also sign in with your email and password.
            </p>
            <SetPasswordForm />
            <Link href="/user/account" className="w-fit text-sky-700 underline">
                Back to account
            </Link>
        </main>
    );
}
