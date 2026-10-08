import { getDetailSpace } from "@/app/actions/user/user-actions";
import EditForm from "./EditForm";




export default async function EditDetail ( { params }: { params: Promise<{ id: string; }>; } )
{
    const { id } = await params;
    const user = await getDetailSpace( id );
    if ( !user.success || !user.data )
    {
        return <div>{ user.message }</div>;
    }
    return (
        <>
            <EditForm id={ id } user={ user.data } />
        </>
    );
}
