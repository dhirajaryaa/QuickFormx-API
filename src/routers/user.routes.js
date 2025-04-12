import { Router } from "express";
import { authorizedUser } from "../middlewares/auth.middleware.js";
import { getUserProfile } from "../controllers/user/getProfile.controller.js";
import { updateUserProfile } from "../controllers/user/updateProfile.controller.js";
import { removeUserProfile } from "../controllers/user/removeProfile.controller.js";

export const router = Router();

//! protected Routes
// get user profile
router.get("/profile", authorizedUser, getUserProfile );
// update user profile
router.put("/profile", authorizedUser, updateUserProfile );
// remove user profile
router.delete("/profile", authorizedUser, removeUserProfile );
