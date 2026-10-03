
import { getSession } from "@/lib/auth/get-session";
import BasicPart from "./Basic";
import SecurityPassword from "./Security";


export default async function Account ()
{
    const session = await getSession();
    return (
        <div className="h-full w-full py-30 px-2 flex justify-center items-center bg-gray-300 rounded-2xl">
            <div className="h-fit py-10 w-150 bg-white  flex flex-col gap-10 justify-center items-center rounded-2xl shadow-2xl">
                <div className="border-b border-gray-200 w-full flex justify-center items-center py-5">
                    <BasicPart session={ session } />
                </div>
                <div className=" w-full flex justify-center items-center ">
                    <SecurityPassword session={ session } />
                </div>
            </div>
        </div>
    );
}
