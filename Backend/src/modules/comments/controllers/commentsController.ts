import { CommentsService } from "./../services/commentsService.js";
import {
  validateComments,
  validatePartialComments,
} from "../schemas/commentsSchema.js";
import { Request, Response } from "express";

export class CommentsController {
  private commentsService: CommentsService;

  addComment = async (req: Request, res: Response) => {
    const validate = validateComments(req.body);
    const comment = this.commentsService.addComments(validate.data);

    comment
      .then((data) => res.status(200).json({ comment: data }))
      .catch((err) => res.status(400).json({ error: err }));
  };
  getAll = async (req: Request, res: Response) => {
    const validate = validatePartialComments({ postId: req.params.postId });
    const comments = this.commentsService.getAll(validate.data.postId);

    comments
      .then((data) => res.status(200).json({ comments: data }))
      .catch((err) => res.status(400).json({ error: err }));
  };
  deleteComment = async (req: Request, res: Response) => {
    const comments = this.commentsService.deleteComments(req.params.id);

    comments
      .then((data) => res.status(200).json({ comments: data }))
      .catch((err) => res.status(400).json({ error: err }));
  };
}
