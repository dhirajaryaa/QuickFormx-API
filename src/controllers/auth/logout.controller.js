import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { User } from "../../models/user.model.js"
import { cookieOptions } from "../../config/env.js"


export const logoutUser = AsyncHandler(async (req, res) => {
    // user login or not 
    if (!req.user) {
        throw new ApiError(403, "Unauthorized Action");
    };
    // get user 
    const user = await User.findById(req.user?._id);
    // empty refresh token 
    user.refreshToken = "";
    await user.save();
    // return res 
    return res
        .status(201)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(201, "user Logged out successfully"));
});