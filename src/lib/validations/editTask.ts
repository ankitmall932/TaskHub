import z from "zod";


export const editTaskSchema = z.object( {
    topic: z.string().trim().min( 1, "Topic is required" ),
    heading: z.string().trim().min( 1, "Topic detail is required" ),
    status: z.enum( [ "Pending", "InProgress", "Completed" ], {
        error: "Please select Status",
    } ),
} );
