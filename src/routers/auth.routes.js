import { Router } from "express";
import { registerUser } from "../controllers/auth/register.controller.js";
import { loginUser } from "../controllers/auth/login.controller.js";

export const router = Router();

// register user 
router.post("/register", registerUser);
// login user 
router.post("/login", loginUser);
