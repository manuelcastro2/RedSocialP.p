import { Router } from "express";
import { PhotoVideoController } from "../controllers/photoVideoController.js";

export const createPhotoVideoRouter = () => {
  const photoVideoRouter = Router();

  const photoVideoController = new PhotoVideoController();

  photoVideoRouter.get("/", photoVideoController.getAll);
  photoVideoRouter.post("/", photoVideoController.create);
  photoVideoRouter.delete("/:id", photoVideoController.delete);

  return photoVideoRouter;
};
