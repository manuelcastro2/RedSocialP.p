import { Router } from "express";
import { UserController } from "../controllers/usersController.js";

export const createUserRouter = () => {

  const userRouter = Router();
  const userController = new UserController();

  userRouter.get("/:id", userController.getProfile);
  userRouter.post("/", userController.create);
  userRouter.patch("/:id", userController.update);
  userRouter.delete("/:id", userController.delete);

  return userRouter;
};
