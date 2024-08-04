import { validatePartialUser, validateUser } from "../schemas/userSchema.js";
import { Response, Request } from "express"
import { UserService } from "../services/userService.js";

export class UserController {
  private userService = new UserService();

  getProfile = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.getProfile(req.params.id);
      res.status(200).json({ user });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try { 

      const validate = validatePartialUser(req.body);
      if (!validate.success) {
        return res.status(400).json({ error: validate.error });
      }

      const user = await this.userService.create(validate.data);
      res.status(201).json({user: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const validate = validatePartialUser(req.body);
      if (!validate.success) {
        return res.status(400).json({ error: validate.error });
      }

      const user = await this.userService.update(validate.data, req.params.id);
      res.status(200).json({ user });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.userService.delete(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
}
