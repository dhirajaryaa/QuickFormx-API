import { Router } from "express";
import { registerUser } from "../controllers/auth/register.controller.js";

export const router = Router();

// register user 
router.post("/register", registerUser);
