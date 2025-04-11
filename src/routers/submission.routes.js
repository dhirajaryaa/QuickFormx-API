import { Router } from "express";
import { formSubmission } from "../controllers/submission/submit.controller.js";
import { ApiKeyChecker } from "../middlewares/api.middleware.js";
import { getClientIp } from "../middlewares/clientIP.middleware.js";

export const router = Router();

//! protected Routes
// submit submission 
router.post("/:id/submit",ApiKeyChecker,getClientIp,formSubmission);
