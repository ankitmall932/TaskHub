'use server';

import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { signUpSchema } from "@/lib/validations/signUp";
import { redirect } from "next/navigation";


export async function signUp ( _prevState: { success: boolean; message: string; }, formData: FormData )
{
    try
    {
        const data = {
            name: formData.get( 'name' ),
            email: formData.get( 'email' ),
            password: formData.get( 'password' )
        };
        const result = signUpSchema.safeParse( data );
        if ( !result.success )
        {
            return {
                success: false,
                message: result.error.issues[ 0 ]?.message ?? 'Please check your signup details.',
            };
        }
        const existing = await prisma.user.findUnique( {
            where: {
                email: result.data.email
            },
        } );
        if ( existing && existing.emailVerified )
        {
            return {
                success: false,
                message: 'Email already registered please login'
            };
        }
        await auth.api.signUpEmail( {
            body: {
                name: result.data.name,
                email: result.data.email,
                password: result.data.password,
                callbackURL: '/user/dashboard'
            }
        } );
    }
    catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to create your account.',
        };
    }
    redirect( '/auth/verify-email' );
}