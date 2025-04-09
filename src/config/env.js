import { configDotenv } from "dotenv";

// configure env 
configDotenv({
    path:"./.env"
});

export const {MONGODB_URL,PORT,APP_URL,NODE_ENV,CORS_ORIGIN,CORS_METHODS} = process.env;