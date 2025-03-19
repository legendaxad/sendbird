import { Router } from "express";
import { AuthController } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.post("/login", AuthController.login);

authRouter.post("/me", AuthController.me);
