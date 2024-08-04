import { Router } from "express";
import { AuthController } from "../controllers/authController.js";

export const createAuthRouter = () => {
  const authRouter = Router();
  const authController = new AuthController();
  authRouter.post("/login", authController.login);
  return authRouter
};
