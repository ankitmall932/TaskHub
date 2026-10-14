import { getSession } from "@/lib/auth/get-session";
import { prisma } from "@/lib/db/prisma";


export const countAll = async () =>
{
    try
    {
        const session = await getSession();
        if ( !session )
        {
            return {
                success: false,
                message: 'Unauthorized'
            };
        }
        const [ countStatusTask, countAllTask, countOverdueTask ] = await Promise.all( [
            prisma.task.groupBy( {
                by: [ 'status' ],
                where: {
                    userId: session.user.id,
                },
                _count: {
                    _all: true
                }
            } ),
            prisma.task.count( {
                where: {
                    userId: session.user.id
                }
            } ),
            prisma.task.count( {
                where: {
                    userId: session.user.id,
                    overDue: true
                }
            } )
        ] );
        return {
            success: true,
            data:
            {
                countAllTask,
                countStatusTask,
                countOverdueTask
            }

        };
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
};