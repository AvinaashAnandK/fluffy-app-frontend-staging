import * as z from "zod";

export const formSchema = z.object({
    query: z.string().min(1, {
        message: "Enter your query to Fluff it!"
    }),
});