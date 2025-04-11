import crypto from 'crypto';
import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { apiKeySchema } from "../validations/form/apiKey.schema.js"

export const ApiKeyChecker = AsyncHandler(async (req, res, next) => {
    const incomingApiKey = req.headers["x-api-key"];
    // check api valid format 
    const apiCheck = apiKeySchema.safeParse(incomingApiKey);
    if (!apiCheck.success) {
        throw new ApiError(400, apiCheck.error.issues[0].message);
    };
    // hash api key 
    const hashApiKey = crypto.createHash("sha256").update(incomingApiKey).digest("hex");
    // match api key to db 
    const validUser = await User.findOne({ apiKey: hashApiKey });
    if (!validUser) {
        throw new ApiError(403, "Unauthorized : Invalid API Key");
    }
    req.user = validUser;
    next()
});