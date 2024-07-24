import { FriendsService } from "../services/friendsService.js";
import {
  validatePartialFriends,
  validateFriends,
} from "../schemas/friendsSchema.js";
import { Response, Request } from "express";

export class FriendsController {
  private friendsService: FriendsService;

  getFriendsByUserId = async (req: Request, res: Response) => {
    const validate = validatePartialFriends(req.body);
    const friends = this.friendsService.getFriendsByUserId(
      validate.data.userId
    );

    await friends
      .then((data) => res.status(200).json({ friends: data }))
      .catch((err) => res.status(400).json({ error: err }));
  };

  addFriends = async (req: Request, res: Response) => {
    const validate = validateFriends(req.body);
    const friends = this.friendsService.addFriend(validate.data);

    await friends
      .then((data) => res.status(200).json({ friends: data }))
      .catch((err) => res.status(400).json({ error: err }));
  };
  
  removeFriends = async (req: Request, res: Response) => {
    const validate= validatePartialFriends(req.body)
    const friends = this.friendsService.removeFriend(validate.data.userId,validate.data.friendId)

    await friends.then(data=>res.status(200).json({ friends: data})).catch((err) => res.status(400).json({ error: err}))
  };
}
