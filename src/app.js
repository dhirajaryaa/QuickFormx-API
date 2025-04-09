import express from "express";
import cors from "cors";
import { CORS_METHODS, CORS_ORIGIN, NODE_ENV } from "./config/env.js";

const app = express();

//! =========== setup middlwares ============

// allow request in json fromat 
app.use(express.json());

// url encodeing allow 
app.use(express.urlencoded());

// cors configure 
app.use(cors({
    origin: CORS_ORIGIN,
    methods: CORS_METHODS,
    credentials: NODE_ENV === "production" ? true : false
}));

//! setup error handler 
import {ErrorHandler} from "./middlewares/error.middleware.js";
app.use(ErrorHandler);

export default app;