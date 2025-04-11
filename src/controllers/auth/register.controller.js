import { AsyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { generateUsername } from "../../utils/generateUsername.js";
import { registerUserSchema } from '../../validations/users/registerUser.schema.js'
import { User } from "../../models/user.model.js"
import bcrypt from "bcryptjs";
import crypto from 'crypto';

export const registerUser = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // check valid user input 
    const result = registerUserSchema.safeParse({ name, email, password });
    if (!result.success) {
        const message = result.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', ');
        throw new ApiError(400, `${message}`);
    };
    // check user exists 
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new ApiError(400, "User Already Exists");
    };
    // hash user password 
    const hashedPassword = await bcrypt.hash(password, 12);
    // generate api key 
    const rowApiKey = crypto.randomBytes(32).toString("hex");
    // hash api key for security 
    const hashApiKey = crypto.createHash("sha256").update(rowApiKey).digest("hex")
    // save new user in db 
    const newUser = await User.create({
        name,
        email,
        username: generateUsername(name),
        password: hashedPassword,
        apiKey: hashApiKey
    });
    // remove sensitive information
    const user = await User.findById(newUser._id).select("-password -apiKey -refreshToken -updatedAt");

    // return response 
    return res.status(201).json(new ApiResponse(201, "user register successful", {user,apiKey:rowApiKey}));
});