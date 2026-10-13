
import { detailTask } from '@/app/actions/user/task-actions';
import EditTask from './EditTask';

export default async function page ( { params }: { params: Promise<{ id: string; }>; } )
{
    const { id } = await params;
    const task = await detailTask( id );
    if ( !task.success || !task.data )
    {
        return <p>{ task.message }</p>;
    }
    return (
        <div>
            <EditTask id={ id } task={ task.data } />
        </div>
    );
}