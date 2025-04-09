import { z } from "zod";
import { passwordSchema } from "./password.schema.js"

export const loginUserSchema = z.object({
    identifier: z.union([
        z.string().email({ message: "Invalid email address" }).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email"),
        z.string().min(3, { message: "Username must be at least 3 characters" }).regex(/^[a-zA-Z0-9_.]{3,20}$/, "username only contain letters, numbers, underscores, dots"),
    ]),
    password: passwordSchema
});