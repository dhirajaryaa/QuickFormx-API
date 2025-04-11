import { z } from "zod";
import { passwordSchema } from "./password.schema.js"
import { usernameSchema } from "./username.schema.js"

export const loginUserSchema = z.object({
    identifier: z.union([
        z.string().email({ message: "Invalid email address" }).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email"),
        usernameSchema
    ]),
    password: passwordSchema
});