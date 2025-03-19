import { Router } from "express";
import { authRouter } from "./userRoutes.js";

const router = Router();

router.use("/auth", authRouter);
export { router };
