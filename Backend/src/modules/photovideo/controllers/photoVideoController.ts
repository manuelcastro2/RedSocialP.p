import { PhotoVideoService } from "../services/photoVideoService.js";
import {
  validatePartialPhotoVideo,
  validatePhotoVideo,
} from "../schemas/photoVideoSchema.js";
import { Request, Response } from "express";
export class PhotoVideoController {
  private photoVideoService=new PhotoVideoService();

  getAll = async (req: Request, res: Response) => {
    const validatePV = validatePartialPhotoVideo(req.body);
    const photoVideo = this.photoVideoService.getAll(validatePV.data.userId);

    await photoVideo
      .then((data) => res.status(201).json({ photoVideo: data }))
      .catch((err) => res.status(404).json({ error: err }));
  };

  delete = async (req: Request, res: Response) => {
    const photoVideo = this.photoVideoService.delete(req.params.id);

    await photoVideo
      .then((data) => res.status(201).json({ photoVideo: data }))
      .catch((err) => res.status(404).json({ error: err }));
  };
}
