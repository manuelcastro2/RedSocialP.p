import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { corsMiddleware } from "./src/modules/middleware/cors.js";
import { createUserRouter } from "./src/modules/users/routes/usersRouter.js";
import { createPostRouter } from "./src/modules/posts/routes/postsRouter.js";
import { createPhotoVideoRouter } from "./src/modules/photoVideo/routes/photosVideoRouter.js";
import { createMessagesRouter } from "./src/modules/messages/routes/messagesRouter.js";
import { createFriendsRouter } from "./src/modules/friends/routes/friendsRouter.js";
import { createCommentsRouter } from "./src/modules/comments/routes/commentsRouter.js";
import { createInfoRouter } from "./src/modules/users/routes/infoRouter.js";
import { createUploadRouter } from "./src/modules/uploadFile/routes/uploadPhotoVideoRoutes.js";
import { createAuthRouter } from "./src/modules/users/auth/routes/authRoute.js";

  const app = express();

  dotenv.config();

  app.use(corsMiddleware());
  app.use(bodyParser.json());
  const PORT = process.env.PORT || 3333;

  app.use("/users", createUserRouter());
  app.use("/info", createInfoRouter());
  app.use("/posts", createPostRouter());
  app.use("/photoVideo", createPhotoVideoRouter());
  app.use("/messages", createMessagesRouter());
  app.use("/friends", createFriendsRouter());
  app.use("/comments", createCommentsRouter());
  app.use("/upload", createUploadRouter());
  app.use("/auth", createAuthRouter());

  app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
  });

