import { signOut } from "@/app/actions/auth/auth-actions";
import { auth } from "@/lib/auth/auth";


type Session = typeof auth.$Infer.Session;
export default function SecurityPassword ( { session }: { session: Session | null; } )
{
    return (
        <>
            <div className="flex h-full w-full flex-col gap-5 px-2 sm:px-5 justify-center items-center">
                <h1>Devices & Security</h1>
                <div className=" w-full flex flex-wrap gap-5   items-center justify-around h-fit p-2">
                    <div onClick={ signOut } className="p-2 bg-red-500 rounded-lg cursor-pointer text-white">Logout </div>
                    <div className="p-2 bg-red-500 rounded-lg cursor-pointer text-white">Logout All</div>
                    <div className="p-2 bg-red-500 rounded-lg cursor-pointer text-white">Delete Account </div>
                </div>
            </div>
        </>
    );
}
