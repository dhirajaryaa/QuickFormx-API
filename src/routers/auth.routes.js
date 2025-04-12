import { Router } from "express";
import { registerUser } from "../controllers/auth/register.controller.js";
import { loginUser } from "../controllers/auth/login.controller.js";
import { logoutUser } from "../controllers/auth/logout.controller.js";
import { authorizedUser } from "../middlewares/auth.middleware.js";
import { tokenRefresh } from "../controllers/auth/refreshToken.controller.js";

export const router = Router();

// register user 
router.post("/register", registerUser);
// login user 
router.post("/login", loginUser);
// token refresh 
router.get("/token", tokenRefresh);

//! protected Routes
// logout user 
router.post("/logout", authorizedUser, logoutUser);
