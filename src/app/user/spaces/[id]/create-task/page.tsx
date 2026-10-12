import Create from "./Create";

export default async function CreateTask ( { params }: { params: Promise<{ id: string; }>; } )
{
    const { id } = await params;
    return (
        <div>
            <Create id={ id } />
        </div>
    );
}
