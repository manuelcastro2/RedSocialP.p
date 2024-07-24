import { Router } from "express";
import { MessagesController } from "../controllers/messagesController.js";

export const createMessagesRouter = () => {
  const messagesRouter = Router();

  const messagesController = new MessagesController();

  messagesRouter.get("/", messagesController.getAll);
  messagesRouter.post("/", messagesController.create);
  messagesRouter.delete("/:id", messagesController.delete);

  return messagesRouter;
};
