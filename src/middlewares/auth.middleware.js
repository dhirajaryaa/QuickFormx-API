import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

export const authorizedUser = AsyncHandler(async (req, res, next) => {
    const incomingToken = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");
    // check token present or not 
    if (!incomingToken) {
        throw new ApiError(401, "Unauthorized Access, Access token is missing or invalid.");
    };
    // decoded token 
    const decodedToken = await jwt.decode(incomingToken, ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
        throw new ApiError(401, "Unauthorized, Invalid or Malformed Token.");
    };
    // check token expiry
    const tokenExpired = decodedToken.exp < Date.now() / 1000;
    if (tokenExpired) {
        throw new ApiError(403, "Unauthorized, Token Expired");
    };

    // set user on req 
    req.user = decodedToken
    next()
});