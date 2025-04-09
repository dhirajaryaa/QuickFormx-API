import { configDotenv } from "dotenv";

// configure env 
configDotenv({
    path: "./.env"
});

export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false
}

export const {
    MONGODB_URL,
    PORT,
    APP_URL,
    NODE_ENV,
    CORS_ORIGIN,
    CORS_METHODS,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN
} = process.env;