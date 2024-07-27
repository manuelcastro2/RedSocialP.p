import { PhotoVideoService } from "../services/photoVideoService.js";
import {
  validatePartialPhotoVideo,
  validatePhotoVideo,
} from "../schemas/photoVideoSchema.js";
import { Request, Response } from "express";
import { uploadFileToB2 } from "../services/fileServces.js";

export class PhotoVideoController {
  private photoVideoService: PhotoVideoService;

  getAll = async (req: Request, res: Response) => {
    const validatePV = validatePartialPhotoVideo(req.body);
    const photoVideo = this.photoVideoService.getAll(validatePV.data.userId);

    await photoVideo
      .then((data) => res.status(201).json({ photoVideo: data }))
      .catch((err) => res.status(404).json({ error: err }));
  };

  create = async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded");
    }
      const fileUrl = await uploadFileToB2(file);

    const validatePV = validatePhotoVideo(req.body);
    const photoVideo = this.photoVideoService.create({
      postsId: validatePV.data.postsId,
      url: fileUrl,
      userId: validatePV.data.userId,
    });

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
