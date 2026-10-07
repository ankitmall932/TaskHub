import { signOut, signOutAll } from "@/app/actions/auth/auth-actions";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import DeleteAccountButton from "./DeleteAccountButton";


type Session = typeof auth.$Infer.Session;
function getDeviceName ( userAgent: string | null | undefined )
{
    if ( !userAgent ) return "Unknown device";

    const browser = /Edg\//.test( userAgent ) ? "Edge"
        : /OPR\//.test( userAgent ) ? "Opera"
            : /Chrome\//.test( userAgent ) ? "Chrome"
                : /Firefox\//.test( userAgent ) ? "Firefox"
                    : /Safari\//.test( userAgent ) ? "Safari"
                        : "Unknown browser";
    const platform = /Android/i.test( userAgent ) ? "Android"
        : /iPhone|iPad|iPod/i.test( userAgent ) ? "iOS"
            : /Windows/i.test( userAgent ) ? "Windows"
                : /Macintosh|Mac OS/i.test( userAgent ) ? "macOS"
                    : /Linux/i.test( userAgent ) ? "Linux"
                        : "Unknown platform";
    return `${ browser } on ${ platform }`;
}

export default async function SecurityPassword ( { session }: { session: Session | null; } )
{
    const currentSessionId = session?.session.id;
    let sessions: Awaited<ReturnType<typeof auth.api.listSessions>> = [];
    let sessionIsStale = false;

    if ( session )
    {
        try
        {
            sessions = await auth.api.listSessions( { headers: await headers() } );
        }
        catch ( error )
        {
            if ( error instanceof APIError && error.body?.code === "SESSION_NOT_FRESH" )
            {
                sessionIsStale = true;
            }
            else
            {
                throw error;
            }
        }
    }

    return (
        <>
            <div className="flex h-full w-full flex-col gap-5 px-2 sm:px-5 items-center">
                <h1 className="text-xl font-semibold">Devices &amp; Security</h1>
                <div className="w-full flex flex-wrap gap-5  mt-10 items-center justify-around h-fit p-2">
                    <form action={ signOut }>
                        <button type="submit" className="rounded-lg bg-red-500 p-2 cursor-pointer text-white">Logout</button>
                    </form>
                    <form action={ signOutAll }>
                        <button type="submit" className="rounded-lg bg-red-600 p-2 cursor-pointer text-white">Logout all devices</button>
                    </form>
                    <DeleteAccountButton />
                </div>


                <section className="w-full space-y-3" aria-labelledby="signed-in-devices-heading">
                    <div>
                        <h2 id="signed-in-devices-heading" className="text-lg font-semibold">Signed-in devices</h2>
                    </div>
                    { sessionIsStale ? (
                        <div className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                            <p className="text-sm text-amber-900">
                                For your security, sign in again to view your active devices.
                            </p>
                            <form action={ signOut }>
                                <button type="submit" className="rounded-lg bg-amber-700 px-3 py-2 text-sm font-medium text-white">
                                    Sign in again
                                </button>
                            </form>
                        </div>
                    ) : sessions.length > 0 ? (
                        <ul className="space-y-3">
                            { sessions.map( ( device ) =>
                            {
                                const isCurrent = device.id === currentSessionId;
                                const status = isCurrent ? "Current device" : "Active";
                                return (
                                    <li key={ device.id } className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="min-w-0">
                                            <p className="font-medium">{ getDeviceName( device.userAgent ) }</p>
                                            <p className="text-sm text-gray-500">{ device.createdAt.toLocaleString() }</p>
                                        </div>
                                        <span className={ `w-fit rounded-full px-3 py-1 text-xs font-medium ${ isCurrent ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800" }` }>
                                            { status }
                                        </span>
                                    </li>
                                );
                            } ) }
                        </ul>
                    ) : (
                        <p className="rounded-xl border border-gray-200 p-4 text-sm text-gray-600">
                            No active devices found.
                        </p>
                    ) }
                </section>
            </div>
        </>
    );
}
