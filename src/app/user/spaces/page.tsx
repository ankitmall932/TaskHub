import Link from "next/link";
import Space from "./Space";
import { Plus } from "lucide-react";

export default function Spaces ()
{
    return (
        <>
            <div>
                <Space />
            </div>
            <div className="fixed bottom-20 sm:right-20 right-10 ">
                <Link href={ '/user/spaces/create-space' }><Plus className="bg-blue-500 p-3 text-white rounded-xl hover:scale-105 active:scale-95 duration-200" size={ 56 } color="white" strokeWidth={ 2.5 } /></Link>
            </div>
        </>
    );
}