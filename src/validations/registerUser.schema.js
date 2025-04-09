import { z } from "zod";
import { passwordSchema } from "./password.schema.js"

export const registerUserSchema = z.object({
    email: z.string()
        .email()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email"),
    password: passwordSchema
});