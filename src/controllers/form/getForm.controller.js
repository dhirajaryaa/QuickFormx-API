import mongoose from "mongoose";
import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { getFormSchema } from "../../validations/form/getForm.schema.js";
import { Form } from "../../models/form.model.js"

export const getSingleForm = AsyncHandler(async (req, res) => {
    const { id: formId } = req.params;
    // check valid form id 
    const result = getFormSchema.safeParse(formId);
    if (!result.success) {
        const message = result.error.issues
            .map((issue) => issue.message)
            .join(', ');
        throw new ApiError(400, message);
    };
    //    get form data 
    const formData = await Form.findById(new mongoose.Types.ObjectId(formId));
    // form not found 
    if (!formData) {
        throw new ApiError(404, "Form not found");
    };

    // return response 
    return res.status(200).json(new ApiResponse(200, "Form fetched successful", formData));
});