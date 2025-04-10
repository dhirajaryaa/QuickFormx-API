import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { generateAccessAndRefreshToken } from "../../utils/generateTokens.js";
import { cookieOptions, REFRESH_TOKEN_SECRET } from "../../config/env.js"
import jwt from 'jsonwebtoken';

export const tokenRefresh = AsyncHandler(async (req, res) => {
    const incomingToken = req.cookies.refreshToken
    // check token present or not 
    if (!incomingToken) {
        throw new ApiError(401, "Unauthorized Access, Refresh token is missing or invalid.");
    };
    // decoded token 
    const decodedToken = await jwt.decode(incomingToken, REFRESH_TOKEN_SECRET);
    if (!decodedToken) {
        throw new ApiError(401, "Unauthorized, Invalid or Malformed Refresh Token.");
    };
    // generate token 
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(decodedToken._id);
    // return res 
    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, "token refresh successful", { accessToken, refreshToken }));
});