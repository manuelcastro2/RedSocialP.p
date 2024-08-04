import { Router } from "express";
import { CommentsController } from "../controllers/commentsController.js";

export const createCommentsRouter = () => {
  const commentsRouter = Router();
  const commentsController = new CommentsController();

  commentsRouter.get("/:postId", commentsController.getAll);
  commentsRouter.post("/", commentsController.addComment);
  commentsRouter.delete("/:id", commentsController.deleteComment);

  return commentsRouter;
};
