import mongoose from "mongoose";
import { MONGODB_URL, NODE_ENV } from "../config/env.js"
import { DB_NAME } from "../constant.js";


export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
        console.log(`## Mongodb connected with ${NODE_ENV} server and hostname is: ${connectionInstance.connection.host} ##`);
    } catch (error) {
        console.error("mongodb connection error:", error);
        process.exit(1);
    }
};