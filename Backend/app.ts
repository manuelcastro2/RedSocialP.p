import express,{Request,Response,NextFunction} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import { createUserRouter } from './src/modules/users/routes/usersRouter.js';
import { createPostRouter } from './src/modules/posts/routes/postsRouter.js';
import { createPhotoVideoRouter } from './src/modules/photovideo/routes/photosVideoRouter.js';
import { createMessagesRouter } from './src/modules/messages/routes/messagesRouter.js';
import { createFriendsRouter } from './src/modules/friends/routes/friendsRouter.js';
import { createCommentsRouter } from './src/modules/comments/routes/commentsRouter.js';

const app = express();

dotenv.config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const PORT = process.env.PORT||3333;

app.use('/users', createUserRouter);
app.use('/posts',createPostRouter)
app.use('/photoVideo',createPhotoVideoRouter)
app.use('/messages',createMessagesRouter)
app.use('/friends',createFriendsRouter)
app.use('/comments',createCommentsRouter)


app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});