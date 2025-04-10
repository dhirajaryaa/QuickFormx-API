import jwt from 'jsonwebtoken';
import { ApiError } from './apiError.js';
import { ApiResponse } from './apiResponse.js';
import { User } from '../models/user.model.js';
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET } from "../config/env.js"


export const generateAccessAndRefreshToken = async function (user_id) {
    const user = await User.findById(user_id);
    if (!user) return null;

    const accessToken = await jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email
    }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

    const refreshToken = await jwt.sign({
        _id: user._id
    }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false});
    return { accessToken, refreshToken }
}