import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET ( request: Request )
{
    const cronSecret = process.env.CRON_SECRET;
    if ( !cronSecret )
    {
        return NextResponse.json(
            { error: "Cron secret is not configured" },
            { status: 500 },
        );
    }
    if ( request.headers.get( "authorization" ) !== `Bearer ${ cronSecret }` )
    {
        return NextResponse.json( { error: "Unauthorized" }, { status: 401 } );
    }
    const result = await prisma.task.updateMany( {
        where: {
            due: { lt: new Date() },
            status: {
                in: [ "Pending", "InProgress" ],
            },
            overDue: false,
        },
        data: {
            overDue: true,
        },
    } );
    return NextResponse.json( {
        success: true,
        dueTask: result,
    } );
}