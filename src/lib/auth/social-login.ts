import { createAuthClient } from "better-auth/react";


export async function socialLogin ( provider: 'google' | 'github' )
{
    const authClient = createAuthClient();
    await authClient.signIn.social( {
        provider,
        callbackURL: '/user/dashboard'
    } );
}