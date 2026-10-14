import Graph from "./Graph";
import Today from "./Today";
import Top from "./Top";


export default function Dashboard ()
{
    return (
        <>
            <div className="flex flex-col border border-gray-500 p-1 rounded-2xl h-full w-full">
                <h1 className="text-center text-2xl font-bold mt-3">Overview</h1>
                <h2 className="text-center text-sm font-semibold mb-3">Monitor all of your tasks here</h2>
                <Top />
                <Today />
                <Graph />
            </div>
        </>
    );
}