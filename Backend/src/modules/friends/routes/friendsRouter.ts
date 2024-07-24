import { Router } from "express";
import { FriendsController } from "../controllers/friendsController.js";

export const createFriendsRouter = () => {
  const friendsRouter = Router();

  const friendsController = new FriendsController();

  friendsRouter.get("/", friendsController.getFriendsByUserId);
  friendsRouter.post("/", friendsController.addFriends);
  friendsRouter.delete("/", friendsController.removeFriends);

  return friendsRouter;
};
