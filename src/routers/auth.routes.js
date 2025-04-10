import { Router } from "express";
import { registerUser } from "../controllers/auth/register.controller.js";
import { loginUser } from "../controllers/auth/login.controller.js";
import { logoutUser } from "../controllers/auth/logout.controller.js";
import { authorizedUser } from "../middlewares/auth.middleware.js";

export const router = Router();

// register user 
router.post("/register", registerUser);
// login user 
router.post("/login", loginUser);

//! protected Routes
// logout user 
router.post("/logout", authorizedUser ,logoutUser);
