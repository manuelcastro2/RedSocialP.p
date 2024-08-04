import { Router } from "express";
import { PhotoVideoController } from "../controllers/photoVideoController.js";

export const createPhotoVideoRouter = () => {
  const photoVideoRouter = Router();

  const photoVideoController = new PhotoVideoController();

  photoVideoRouter.get("/", photoVideoController.getAll);
  photoVideoRouter.delete("/:id", photoVideoController.delete);

  return photoVideoRouter;
};
