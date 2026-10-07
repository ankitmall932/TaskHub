import { auth } from "@/lib/auth/auth";
import Password from "@/app/user/account/Password";
import Image from "next/image";
import Link from "next/link";


type Session = typeof auth.$Infer.Session;
export default function BasicPart ( { session }: { session: Session | null; } )
{
    const image = session?.user?.image;
    const userName = session?.user.name[ 0 ].toUpperCase();
    return (
        <>
            <div className="flex h-full w-full flex-col p-2 sm:p-5 justify-center items-center">
                { image ? (
                    <Image src={ image } alt="Account avatar" width={ 40 } height={ 40 } className="h-10 w-10 rounded-full object-cover" />
                ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                        { userName }
                    </span>
                ) }
                <div className=" w-full flex flex-row border-b gap-2 sm:gap-25 lg:gap-50 mt-5 items-center border-gray-300  border-t h-fit p-2">
                    <div >Name : </div>
                    <div   >{ session?.user.name }</div>
                </div>
                <div className=" w-full flex flex-row gap-2 sm:gap-25 lg:gap-50 border-b border-gray-300  items-center  h-fit p-2">
                    <div >Email : </div>
                    <div  >{ session?.user.email }</div>
                </div>
                <div className=" w-full flex flex-wrap gap-5  mt-10 items-center justify-around h-fit p-2">
                    <Link href="/user/account/edit-name" className="rounded-lg bg-gray-500 p-2 text-white">
                        Edit name
                    </Link>
                    <Password />
                </div>
            </div>
        </>
    );
}
