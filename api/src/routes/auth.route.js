import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/userValidation.js";

const authRouter = Router();

// prefix : api/auth
authRouter.post("/register", registerController);

authRouter.post("/login", authMiddleware, loginController);

export default authRouter;
