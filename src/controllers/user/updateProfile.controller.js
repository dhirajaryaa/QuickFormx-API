import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { User } from "../../models/user.model.js"
import { profileUpdateSchema } from "../../validations/users/profileUpdate.schema.js"

export const updateUserProfile = AsyncHandler(async (req, res) => {
    const { username, name } = req.body;
    // check user input 
    const result = profileUpdateSchema.safeParse({ name, username });
    if (!result.success) {
        const message = result.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', ');
        throw new ApiError(400, `${message}`);
    };
    // get user info 
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(403, "User not found or unauthorized access")
    };
    // update user data 
    const updatedUser = await User.findByIdAndUpdate(user._id, {
        name: name || user.name,
        username: username || user.username
    }, {
        new: true,
        select: "-password -apiKey -refreshToken"
    });
    // return res 
    return res
        .status(200)
        .json(new ApiResponse(200, "User profile update successfully", updatedUser));
});