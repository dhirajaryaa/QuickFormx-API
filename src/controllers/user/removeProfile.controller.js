import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { User } from "../../models/user.model.js"

export const removeUserProfile = AsyncHandler(async (req, res) => {
    // user login or not 
    if (!req.user) {
        throw new ApiError(403, "Unauthorized user");
    };
    // get user and delete 
    await User.findByIdAndDelete(req.user?._id);
    // return res 
    return res
        .status(200)
        .json(new ApiResponse(200, "User profile Remove successfully"));
});