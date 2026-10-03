import Image from "next/image";
import Link from "next/link";


export default function LandingPage ()
{
    return (
        <>
            <div className="h-full w-full flex md:mt-20 mt-10 flex-col gap-10  ">
                <div className="flex flex-col gap-5 md:w-280 h-full  w-full">
                    <h1 className="md:text-7xl text-5xl font-semibold"><span>Take Control of Your Tasks  </span>
                        and <span className="text-lime-500">Get More Done</span>, <br /><span>Every Day</span></h1>
                    <h2 className="text-lg mb-10">Organize your work, prioritize what matters, track your progress, and stay on top of every task — all in one simple, powerful workspace built to help you work smarter and accomplish more.</h2>
                    <div>
                        <Link className="border border-white bg-black text-white text-xl font-semibold px-5 py-3 rounded-xl " href={ '/auth/login' }>Get Started. It&lsquo;s Free</Link>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center h-full  w-full">
                    <Image className="h-full w-full" src="/background.jpg" width={ 500 } height={ 100 } alt="main image" />
                </div>
            </div>
        </>
    );
}