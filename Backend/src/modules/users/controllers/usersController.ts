import { UserService } from "../services/userService.js";
import { MulterFile, upload } from "../models/userModel.js";
import { validatePartialUser, validateUser } from "../schemas/userSchema.js";
import { Response, Request } from "express";
import { isString } from "util";

export class UserController {
  private userService: UserService;

  getProfile = async (req: Request, res: Response) => {
    const user = this.userService.getProfile(req.params.id);

    await user
      .then((data) => res.status(201).json({ user: data }))
      .catch((err) => res.status(404).json({ error: err }));
  };

  create = async (req: Request, res: Response) => {
    const validate = validateUser(req.body);
    const user = this.userService.create(validate.data);

    await user
      .then((data) => res.status(200).json({ users: data }))
      .catch((err) => res.status(404).json({ error: err }));
  };

  update = async (req: Request, res: Response) => {
    const validate = validatePartialUser(req.body);
    const user = this.userService.update(validate.data, req.params.id);

    await user
      .then((data) => res.status(201).json({ users: data }))
      .catch((err) => res.status(404).json({ error: err }));
  };

  updatePhoto = async (req: Request, res: Response) => {
    const photo = req.file?.path;
    const id: string = req.params.id;

    if (isString(id)) return null;

    const user = this.userService.updatePhoto(photo, req.params.id);

    await user
      .then((data) => res.status(204).json({ users: data }))
      .catch((err) => res.status(404).json({ error: err }));
  };

  delete = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const user = this.userService.delete(id);

    await user
      .then((data) => res.status(204).json({ users: data }))
      .catch((err) => res.status(404).json({ error: err }));
  };
}
