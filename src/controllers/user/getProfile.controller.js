import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { User } from "../../models/user.model.js"


export const getUserProfile = AsyncHandler(async (req, res) => {
    // user login or not 
    if (!req.user) {
        throw new ApiError(403, "Unauthorized user");
    };
    // get user info from db 
    const user = await User.findById(req.user?._id).select("-password -refreshToken");
    if(!user){
        throw new ApiError(404, "user not found!");
    };
    // return res 
    return res
    .status(200)
    .json(new ApiResponse(200, "User profile retrieved successfully", user));
});