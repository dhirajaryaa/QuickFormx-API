import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { createFormSchema } from "../../validations/form/createForm.schema.js";
import { Form } from "../../models/form.model.js"

export const createNewForm = AsyncHandler(async (req, res) => {
    const { title, description, fields } = req.body;
    // check valid user input 
    const result = createFormSchema.safeParse({ title, description, fields });
    if (!result.success) {
        const message = result.error.issues
            .map((issue) =>
                `${fields[issue.path[1]].name}: ${issue.message}`).join(', ');
        throw new ApiError(400, `${message}`);
    };
    // form save in db 
    const newForm = await Form.create({
        title,
        description,
        fields,
        userId: req.user?._id
    });

    // return response 
    return res.status(201).json(new ApiResponse(201, "Form created successful", newForm));
});