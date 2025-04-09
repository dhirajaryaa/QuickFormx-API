import { z } from "zod";
import { passwordSchema } from "./password.schema.js"

export const registerUserSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name can't be more than 50 characters"),
    email: z.string()
        .email()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email"),
    password: passwordSchema
});