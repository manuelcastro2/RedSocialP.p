import { InfoService } from "../services/infoServices.js";
import { validatePartialInfo } from "../schemas/infoSchema.js";
import { Request, Response } from "express";

export class InfoController {
  private infoService: InfoService;

  getByUser = async (req: Request, res: Response) => {
    const validate = validatePartialInfo({ userId: req.params.userId });
    const info = this.infoService.getByUser(validate.data.userId);

    await info
      .then((data) => res.status(200).json({ info: data }))
      .catch((err) => res.status(400).json({ error: err }));
  };

  addInfo = async (req: Request, res: Response) => {
    const validate = validatePartialInfo(req.body);
    const info = this.infoService.addInfo(validate.data);

    info
      .then((data) => res.status(200).json({ info: data }))
      .catch((err) => res.status(400).json({ error: err }));
  };
  update = async (req: Request, res: Response) => {
    const validate = validatePartialInfo(req.body);
    const info = this.infoService.Update(validate.data);

    info
      .then((data) => res.status(200).json({ info: data }))
      .catch((err) => res.status(400).json({ error: err }));
  };
}
