import mongoose from "mongoose";
import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { createFormSchema } from "../../validations/form/createForm.schema.js";
import { getFormSchema } from "../../validations/form/getForm.schema.js";
import { Form } from "../../models/form.model.js";

export const updateForm = AsyncHandler(async (req, res) => {
    const { id: formId } = req.params;
    // Validate formId (MongoDB _id)
    const formIdResult = getFormSchema.safeParse(formId);
    if (!formIdResult.success) {
        const msg = formIdResult.error.issues.map((i) => i.message).join(', ');
        throw new ApiError(400, `Invalid form ID: ${msg}`);
    }
    // Validate form data with partial schema
    const result = createFormSchema.partial().safeParse(req.body);
    if (!result.success) {
        const msg = result.error.issues.map((i) => {
            const index = i.path[1]; // e.g., fields[1].name
            const fieldName = req.body.fields?.[index]?.name || i.path.join(".");
            return `${fieldName}: ${i.message}`;
        }).join(', ');
        throw new ApiError(400, msg);
    }
    const { title, description, fields } = result.data;
    // Find form
    const formData = await Form.findById(new mongoose.Types.ObjectId(formId));
    if (!formData) {
        throw new ApiError(404, "Form not found");
    }
    // Update form
    formData.title = title ?? formData.title;
    formData.description = description ?? formData.description;
    formData.fields = fields ?? formData.fields;
    // update form 
    const updatedForm = await formData.save({ validateBeforeSave: false });
    // return res 
    return res
        .status(200)
        .json(new ApiResponse(200, "Form updated successfully", updatedForm));
});
