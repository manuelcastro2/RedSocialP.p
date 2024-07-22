import { MessagesService } from "../services/messagesService.js";
import {
  validateMessages,
  validatePartialMessages,
} from "../schemas/messagesSchema.js";
import { Request, Response } from "express";

export class MessagesController {
  private messagesService: MessagesService;

  getAll = async (req: Request, res: Response) => {
    const validate = validatePartialMessages(req.body);
    const messages = this.messagesService.getAll(
      validate.data.sederId,
      validate.data.receiverId
    );

    await messages
      .then((data) => res.status(201).json({ messages: data }))
      .catch((err) => res.status(404).json({ error: err }))
  };

  create = async (req: Request, res: Response) => {
    const validate = validateMessages(req.body);
    const messages = this.messagesService.create(validate.data);

    messages
      .then((data) => res.status(200).json({ messages: data }))
      .catch((err) => res.status(404).json({ error: err }))
  };

  delete = async (req: Request, res: Response) => {
    const messages = this.messagesService.delete(req.params.id);

    messages
      .then((data) => res.status(200).json({ messages: data }))
      .catch((err) => res.status(404).json({ error: err }))
  };
}
