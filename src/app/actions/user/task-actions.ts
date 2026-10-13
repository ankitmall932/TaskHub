'use server';

import { getSession } from "@/lib/auth/get-session";
import { prisma } from "@/lib/db/prisma";
import { createTaskSchema } from "@/lib/validations/createTask";
import { editTaskSchema } from "@/lib/validations/editTask";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export const createTask = async ( id: string, _prevState: { success: boolean, message: string; }, formData: FormData ) =>
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
        const values = {
            topic: formData.get( 'topic' ),
            heading: formData.get( 'heading' ),
            priority: formData.get( 'priority' ),
            start: formData.get( 'start' ),
            due: formData.get( 'due' )
        };
        const validations = createTaskSchema.safeParse( values );
        if ( !validations.success )
        {
            return {
                success: false,
                message: validations.error.issues[ 0 ].message ?? 'Please enter correct details'
            };
        }
        const space = await prisma.spaces.findFirst( {
            where: {
                id,
                userId: session.user.id
            },
            select: {
                id: true
            }
        } );
        if ( !space )
        {
            return {
                success: false,
                message: 'Space not found'
            };
        }
        await prisma.task.create( {
            data: {
                topic: validations.data.topic,
                heading: validations.data.heading,
                priority: validations.data.priority,
                start: new Date( `${ validations.data.start }` ),
                due: new Date( `${ validations.data.due }` ),
                userId: session.user.id,
                spaceId: id
            }
        } );
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
    redirect( `/user/spaces/${ id }` );
};

export const getTaskBySpace = async ( id: string ) =>
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
                spaceId: id,
                userId: session.user.id
            },
            orderBy: {
                createdAt: 'desc'
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
            message: error instanceof Error ? error.message : 'something went wrong'
        };
    }
};

export const updateStatus = async ( id: string, status: 'Pending' | 'InProgress' | 'Completed' ) =>
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
        await prisma.task.update( {
            where: {
                id,
                userId: session.user.id
            },
            data: {
                status,
                ...( status === 'Completed' && {
                    overDue: false
                } )
            }
        } );
        return {
            success: true,
            message: 'Task status updated'
        };
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
};

export const detailTask = async ( id: string ) =>
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
        const result = await prisma.task.findFirst( {
            where: {
                id,
                userId: session.user.id
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


export const editTask = async ( id: string, _prevState: { success: boolean, message: string; }, formData: FormData ) =>
{
    let spaceId = '';
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
        const val = {
            topic: formData.get( 'topic' ),
            heading: formData.get( 'heading' ),
            status: formData.get( 'status' ),
        };
        const validations = editTaskSchema.safeParse( val );
        if ( !validations.success )
        {
            return {
                success: false,
                message: validations.error.issues[ 0 ].message ?? 'Please enter the correct detail'
            };
        }
        const task = await prisma.task.findFirst( {
            where: {
                id,
                userId: session.user.id
            }
        } );
        if ( !task )
        {
            return {
                success: false,
                message: 'Task not found'
            };
        }
        spaceId = task.spaceId;
        await prisma.task.update( {
            where: {
                id,
                userId: session.user.id
            },
            data: {
                topic: validations.data.topic,
                heading: validations.data.heading,
                status: validations.data.status,
            }
        } );
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
    redirect( `/user/spaces/${ spaceId }` );
};

export const deleteTask = async ( id: string, spaceId: string ) =>
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
        await prisma.task.delete( {
            where: {
                id,
                userId: session.user.id
            }
        } );
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
    revalidatePath( `/user/spaces/${ spaceId }` );
};

export const getAllTask = async () =>
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
        const tasks = await prisma.task.findMany( {
            where: {
                userId: session.user.id
            },
            include: {
                spaces: {
                    select: {
                        name: true,
                    }
                }
            }
        } );
        return {
            success: true,
            data: tasks
        };
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
};