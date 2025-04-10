import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_METHODS, CORS_ORIGIN, NODE_ENV } from "./config/env.js";

const app = express();

//! =========== setup middlewares ============

// allow request in json format 
app.use(express.json());

// url encoding allow 
app.use(express.urlencoded());

// cors configure 
app.use(cors({
    origin: CORS_ORIGIN,
    methods: CORS_METHODS,
    credentials: NODE_ENV === "production" ? true : false
}));

// cookie parser 
app.use(cookieParser());

// setup default route 
app.get("/", (req, res) => {
    res.send("<h1>Welcome on QuickFormx.</h1>")
})

//? setup routes
import { router as authRouter } from "./routers/auth.routes.js";
import { router as userRouter } from "./routers/user.routes.js";
import { router as formRouter } from "./routers/form.routes.js";
// auth routes 
app.use("/api/v1/auth", authRouter);
// user routes 
app.use("/api/v1/users", userRouter);
// form routes 
app.use("/api/v1/forms", formRouter);

//! setup error handler 
import { ErrorHandler } from "./middlewares/error.middleware.js";
app.use(ErrorHandler);

export default app;