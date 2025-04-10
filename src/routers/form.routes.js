import { Router } from "express";
import { authorizedUser } from "../middlewares/auth.middleware.js";
import { createNewForm } from "../controllers/form/create.controller.js";

export const router = Router();

//! protected Routes
// create new form
router.post("/", authorizedUser, createNewForm);

