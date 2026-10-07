'use server';

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { signUpSchema } from "@/lib/validations/signUp";
import { headers } from "next/headers";
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
            },
            headers: await headers()
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

export async function signIn ( _prevState: { success: boolean; message: string; }, formData: FormData )
{
    try
    {
        const data = {
            email: formData.get( 'email' ) as string,
            password: formData.get( 'password' ) as string,
        };
        await auth.api.signInEmail( {
            body: {
                email: data.email,
                password: data.password,
                callbackURL: '/user/dashboard'
            },
            headers: await headers()
        } );
    }
    catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to create your account.',
        };
    }
    redirect( '/user/dashboard' );
}

export async function signOut ()
{
    await auth.api.signOut( {
        headers: await headers()
    } );
    window.location.reload();
    redirect( '/' );
}


export async function signOutAll ()
{
    await auth.api.revokeSessions( {
        headers: await headers(),
    } );
    redirect( '/' );
}


export async function requestPasswordReset ( _prevState: { success: boolean; message: string; }, formData: FormData )
{
    const email = formData.get( "email" ) as string;
    if ( !email )
    {
        return { success: false, message: "Enter a valid email address." };
    }

    const baseURL = process.env.BETTER_AUTH_URL;
    if ( !baseURL )
    {
        return { success: false, message: "Password reset is not configured. Please contact support." };
    }

    try
    {
        await auth.api.requestPasswordReset( {
            body: {
                email: email,
                redirectTo: new URL( "/auth/reset-password", baseURL ).toString(),
            },
            headers: await headers(),
        } );
    }
    catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unable to request a password reset.",
        };
    }

    return {
        success: true,
        message: "If an account exists for this email, a password reset link will be sent.",
    };
}

export async function resetAccountPassword ( _prevState: { success: boolean; message: string; }, formData: FormData )
{
    const token = formData.get( "token" ) as string;
    const newPassword = formData.get( "newPassword" ) as string;
    const confirmPassword = formData.get( "confirmPassword" ) as string;

    if ( !token || !newPassword || !confirmPassword )
    {
        return { success: false, message: "Something is wrong." };
    }
    try
    {
        await auth.api.resetPassword( {
            body: { newPassword, token },
            headers: await headers(),
        } );
    }
    catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unable to reset your password.",
        };
    }
    return { success: true, message: "Your password has been reset. You can now sign in." };
}

export async function updateAccountName ( _prevState: { success: boolean; message: string; }, formData: FormData )
{
    const submittedName = formData.get( "name" ) as string;
    if ( !submittedName )
    {
        return { success: false, message: "Please enter a name." };
    }

    try
    {
        await auth.api.updateUser( {
            body: submittedName,
            headers: await headers(),
        } );
    }
    catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unable to update your name.",
        };
    }

    redirect( "/user/account" );
}

export async function changeAccountPassword ( _prevState: { success: boolean; message: string; }, formData: FormData )
{
    const currentPassword = formData.get( "currentPassword" ) as string;
    const newPassword = formData.get( "newPassword" ) as string;
    const confirmPassword = formData.get( "confirmPassword" ) as string;

    if ( !currentPassword || !newPassword || !confirmPassword )
    {
        return { success: false, message: "Please Provide all" };
    }
    try
    {
        await auth.api.changePassword( {
            body: { currentPassword, newPassword },
            headers: await headers(),
        } );
    }
    catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unable to change your password.",
        };
    }
    redirect( "/user/account" );
}

export async function setAccountPassword ( _prevState: { success: boolean; message: string; }, formData: FormData )
{
    const newPassword = formData.get( "newPassword" ) as string;
    const confirmPassword = formData.get( "confirmPassword" ) as string;

    if ( !newPassword || !confirmPassword )
    {
        return { success: false, message: "Please provide all." };
    }
    try
    {
        await auth.api.setPassword( {
            body: { newPassword },
            headers: await headers(),
        } );
    }
    catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unable to set your password.",
        };
    }
    redirect( "/user/account" );
}

export async function deleteAccount ( password?: string )
{
    try
    {
        await auth.api.deleteUser( {
            body: password ? { password, } : {},
            headers: await headers()
        } );
    } catch ( error )
    {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unable to delete account'
        };
    }
    redirect( '/' );
}