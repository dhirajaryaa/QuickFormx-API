import { z } from "zod";

export const passwordSchema = z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(6, "Password can't be more than 64 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
        "Password must include uppercase, lowercase, number, and special character"
    )
    .refine(val => !/\s/.test(val), {
        message: "Password should not contain spaces",
    })

