import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { generateAccessAndRefreshToken } from "../../utils/generateTokens.js";
import { User } from "../../models/user.model.js"
import { loginUserSchema } from "../../validations/loginUser.schema.js"
import { cookieOptions } from "../../config/env.js"
import bcrypt from "bcryptjs";

export const loginUser = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // check validate user input
    const result = loginUserSchema.safeParse({ identifier: email || username, password });
    if (!result.success) {
        const message = result.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', ');
        throw new ApiError(400, `${message}`);
    };
    // check user exists 
    const userExist = await User.findOne({
        $or: [{ email }, { username }]
    });
    if (!userExist) {
        throw new ApiError(404, "User Not Found!");
    };
    // check password 
    const isPasswordCorrect = await bcrypt.compare(password,userExist.password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Password Incorrect");
    };
    // generate token 
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(userExist._id);
    // remove sensitive information
    const user = await User.findById(userExist._id).select("-password -refreshToken -updatedAt");
    // return res 
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, "user login successful", { user, accessToken, refreshToken }));
})