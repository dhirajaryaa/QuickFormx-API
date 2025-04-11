import { Router } from "express";
import { authorizedUser } from "../middlewares/auth.middleware.js";
import { createNewForm } from "../controllers/form/create.controller.js";
import { getSingleForm } from "../controllers/form/getForm.controller.js";
import { getAllForm } from "../controllers/form/getAllForm.controller.js";

export const router = Router();

//! protected Routes
// create new form
router.post("/", authorizedUser, createNewForm);
// get form using id
router.get("/:id", authorizedUser, getSingleForm);
// get forms
router.get("/", authorizedUser, getAllForm);

