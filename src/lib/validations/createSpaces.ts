import z from "zod";


export const createSpacesSchema = z.object( {
    name: z.string().min( 2, 'Space should be more than two words' )
} );