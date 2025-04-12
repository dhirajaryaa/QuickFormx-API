import { z } from "zod";
import { usernameSchema } from "./username.schema.js"

export const profileUpdateSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name can't be more than 50 characters")
        .optional(),
    username: usernameSchema.optional()
});