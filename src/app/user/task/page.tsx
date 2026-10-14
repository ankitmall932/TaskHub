import AllTask from "./AllTask";


export default function Task ()
{
    return (
        <>
            <div>
                <h1 className="text-center text-2xl font-bold p-2 mb-5 border border-gray-500 rounded-2xl">All Tasks</h1>
                <AllTask />
            </div>
        </>
    );
}