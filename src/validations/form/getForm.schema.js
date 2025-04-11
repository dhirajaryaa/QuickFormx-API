import {z} from 'zod';

export const getForm = z
    .string()
    .length(24, { message: "The formId must be exactly 24 characters long." })
    .regex(/^[a-f\d]{24}$/i, { message: "The formId format is invalid. It should be a 24-character hexadecimal string." });