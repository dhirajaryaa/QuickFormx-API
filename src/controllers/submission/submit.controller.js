import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { Form } from "../../models/form.model.js";
import { Submission } from "../../models/submission.model.js";
import { submissionValidator } from "../../validations/form/submission.schema.js";
import { getFormSchema } from "../../validations/form/getForm.schema.js";
import mongoose from "mongoose";


export const formSubmission = AsyncHandler(async (req, res) => {
    const { id: formId } = req.params;
    // check valid form id 
    const form = getFormSchema.safeParse(formId);
    if (!form.success) {
        const message = form.error.issues
            .map((issue) => issue.message)
            .join(', ');
        throw new ApiError(400, message);
    };
    // get form data form db 
    const formData = await Form.findById(new mongoose.Types.ObjectId(formId));
    if (!formData) {
        throw new ApiError(404, "form not found!");
    };
    // generate dynamics schema
    const schema = submissionValidator(formData);
    // check req.body data 
    const userInput = schema.safeParse(req.body);
    // throw error if req.body field invalid 
    if (!userInput.success) {
        const formatted = userInput.error.flatten();
        const errorMessages = Object.entries(formatted.fieldErrors).flatMap(
            ([field, messages]) => messages?.map(msg => `${field}: ${msg}`) || []);
        throw new ApiError(400, errorMessages.join(", "));
    };
    // save submission in db 
    const newSubmission = await Submission.create({
        formId: formData._id,
        clientIp: req?.clientIp,
        data: { ...req.body }
    });
    // return res 
    return res
        .status(201)
        .json(new ApiResponse(201, "Form submit successfully",
            {
                _id: newSubmission?._id,
                data: newSubmission.data
            }));
});