import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPasswordPage ()
{
    return (
        <main className="mx-auto flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg">
            <h1 className="text-2xl font-semibold">Forgot password</h1>
            <p className="text-sm text-gray-600">
                Enter your account email and we will send you a password reset link if an account exists.
            </p>
            <ForgotPasswordForm />
        </main>
    );
}
