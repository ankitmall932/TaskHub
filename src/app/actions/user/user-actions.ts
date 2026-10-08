'use server';

import { getSession } from "@/lib/auth/get-session";
import { prisma } from "@/lib/db/prisma";
import { createSpacesSchema } from "@/lib/validations/createSpaces";
import { redirect } from "next/navigation";


export const createSpace = async ( _prevState: { success: boolean, message: string; }, formData: FormData ) =>
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
        const val = {
            name: formData.get( 'name' )
        };
        const validation = createSpacesSchema.safeParse( val );
        if ( !validation.success )
        {
            return {
                success: false,
                message: validation.error.issues[ 0 ]?.message ?? 'Please enter valid name'
            };
        }
        await prisma.spaces.create( {
            data: {
                name: validation.data.name,
                userId: session.user.id,
            }
        } );
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to create spaces'
        };
    }
    redirect( '/user/spaces' );
};

export const getSpaces = async () =>
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
        const response = await prisma.spaces.findMany( {
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        } );
        return {
            success: true,
            data: response
        };
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Fetching data failed'
        };
    }
};

export const getDetailSpace = async ( id: string ) =>
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
        const response = await prisma.spaces.findFirst( {
            where: {
                id,
                userId: session.user.id,
            }
        } );
        if ( !response )
        {
            return {
                success: false,
                message: 'No Space found with this id'
            };
        }
        return {
            success: true,
            data: response
        };
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
};

export const editSpace = async ( id: string, _prevState: { success: boolean, message: string; }, formData: FormData ) =>
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
        const val = {
            name: formData.get( 'name' )
        };
        const validation = createSpacesSchema.safeParse( val );
        if ( !validation.success )
        {
            return {
                success: false,
                message: validation.error.issues[ 0 ].message ?? 'Please enter the valid details'
            };
        }
        await prisma.spaces.update( {
            where: {
                id,
                userId: session.user.id
            },
            data: {
                name: validation.data.name
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

export const deleteSpace = async ( id: string ) =>
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
        await prisma.spaces.delete( {
            where: {
                id,
                userId: session.user.id
            }
        } );
    } catch ( error )
    {
        return {
            message: error instanceof Error ? error.message : 'Something went wrong'
        };
    }
    redirect( '/user/spaces' );
};