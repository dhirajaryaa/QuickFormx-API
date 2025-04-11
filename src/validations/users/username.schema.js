import { z } from 'zod';

export const usernameSchema = z.string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(60, { message: "username must be less then 60 characters" })
    .regex(/^[a-zA-Z0-9_.]{3,20}$/, "username only contain letters, numbers, underscores, dots")