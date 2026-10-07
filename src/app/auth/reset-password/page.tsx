import ResetPasswordForm from "./ResetPasswordForm";
import Link from "next/link";

type ResetPasswordPageProps = {
    searchParams: Promise<{ token?: string | string[]; error?: string | string[]; }>;
};

export default async function ResetPasswordPage ( { searchParams }: ResetPasswordPageProps )
{
    const params = await searchParams;
    const token = typeof params.token === "string" ? params.token : null;
    const hasError = typeof params.error === "string";

    return (
        <main className="mx-auto flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg">
            <h1 className="text-2xl font-semibold">Reset password</h1>
            { token && !hasError ? (
                <ResetPasswordForm token={ token } />
            ) : (
                <>
                    <p role="alert" className="text-red-700">
                        This password reset link is invalid or expired. Request a new reset link.
                    </p>
                    <Link href="/auth/forgot-password" className="w-fit text-sky-700 underline">
                        Request a new reset link
                    </Link>
                </>
            ) }
        </main>
    );
}
