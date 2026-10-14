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

export const getCompletedTask = async () =>
{
    try
    {
        const session = await getSession();
        if ( !session )
        {
            return {
                success: false,
                message: "Unauthorized"
            };
        }
        const result = await prisma.task.findMany( {
            where: {
                userId: session.user.id,
                status: 'Completed'
            },
            include: {
                spaces: {
                    select: {
                        name: true
                    }
                }
            }
        } );
        return {
            success: true,
            data: result
        };
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
};

export const getInProgressTask = async () =>
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
        const result = await prisma.task.findMany( {
            where: {
                userId: session.user.id,
                status: 'InProgress'
            },
            include: {
                spaces: {
                    select: {
                        name: true
                    }
                }
            }
        } );
        return {
            success: true,
            data: result
        };
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
};

export const getPendingTask = async () =>
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
        const result = await prisma.task.findMany( {
            where: {
                userId: session.user.id,
                status: 'Pending'
            },
            include: {
                spaces: {
                    select: {
                        name: true
                    }
                }
            }
        } );
        return {
            success: true,
            data: result
        };
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
};

export const getOverDueTask = async () =>
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
        const result = await prisma.task.findMany( {
            where: {
                userId: session.user.id,
                overDue: true
            },
            include: {
                spaces: {
                    select: {
                        name: true
                    }
                }
            }
        } );
        return {
            success: true,
            data: result
        };
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
};