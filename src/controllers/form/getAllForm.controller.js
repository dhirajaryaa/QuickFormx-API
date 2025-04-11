import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { Form } from "../../models/form.model.js"

export const getAllForm = AsyncHandler(async (req, res) => {
    const { page, limit } = req.query;

    if (page && limit) {
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const skip = (pageNumber - 1) * limitNumber;

        const totalForms = await Form.countDocuments();
        const forms = await Form.find({ userId: req.user?._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        const totalPages = Math.ceil(totalForms / limitNumber);

        return res.status(200).json(
            new ApiResponse(200, "All Form Fetched successfully", {
                totalForms,
                totalPages,
                currentPage: pageNumber,
                forms,
            })
        );
    } else {
        // No pagination — return all
        const forms = await Form.find({ userId: req.user?._id }).sort({ createdAt: -1 }).limit(10);

        return res.status(200).json(new ApiResponse(200, "All Form Fetched successfully", forms));
    }
});