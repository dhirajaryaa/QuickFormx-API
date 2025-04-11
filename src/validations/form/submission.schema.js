import { z } from "zod";

export const submissionValidator = (formData = { fields: [] }) => {
    const shape = {};

    for (const field of formData.fields) {
        let validator;

        switch (field.type) {
            case "text":
            case "textarea":
                validator = z.string().trim();
                break;

            case "email":
                validator = z.string().email("Invalid email format");
                break;

            case "number":
                validator = z.coerce.number();
                break;

            case "date":
                validator = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)");
                break;

            case "checkbox":
                validator = z.array(z.string());
                break;

            case "select":
            case "radio":
                if (field.options?.length) {
                    validator = z.enum([...field.options]);
                } else {
                    validator = z.string();
                }
                break;
            default:
                validator = z.any();
        }

        // Apply required or optional
        if (field.required) {
            validator = validator;
        } else {
            validator = validator.optional();
        }

        shape[field.name] = validator;
    }

    return z.object(shape).strict(); // prevent unexpected fields
};
