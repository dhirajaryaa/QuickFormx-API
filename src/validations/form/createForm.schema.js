import { z } from "zod";

export const fieldsSchema = z.object({
    label: z
        .string()
        .min(3, "Label must be at least 3 characters long")
        .max(60, "Label can't be more than 60 characters"),
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long"),
    type: z
        .enum(["text", "textarea", "email", "number", "radio", "checkbox", "select", "date", "file"]),
    placeholder: z
        .string()
        .min(3, "Placeholder must be at least 3 characters long")
        .max(60, "Placeholder can't be more than 60 characters")
        .optional(),
    required: z.boolean().optional(),
    options: z.array(z.string()).optional()
});

export const createFormSchema = z.object({
    title: z
        .string()
        .min(6, "Title must be at least 6 characters long")
        .max(60, "Title can't be more than 60 characters"),
    description: z
        .string()
        .min(6, "Description must be at least 6 characters long")
        .max(300, "Description can't be more than 300 characters")
        .optional(),
    fields: z
        .array(fieldsSchema)
        .min(1, "At least one field is required")
})