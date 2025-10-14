import { Router } from "express";
import { registeruser } from "../controllers/user.controller.js";

export const router = Router();

router.route("/register").post(registeruser)

