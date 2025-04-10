import { Router } from "express";
import { authorizedUser } from "../middlewares/auth.middleware.js";
import { getUserProfile } from "../controllers/user/getProfile.controller.js";

export const router = Router();

//! protected Routes
// get user profile
router.get("/profile", authorizedUser, getUserProfile );
