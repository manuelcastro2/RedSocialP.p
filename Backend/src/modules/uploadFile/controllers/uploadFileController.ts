import { uploadFileToB2 } from "../services/fileServices.js";
import { Response, Request } from "express";
import { UserService } from "../../users/services/userService.js";
import { validatePartialUser } from "../../users/schemas/userSchema.js";
import { PostsService } from "../../posts/services/postService.js";
import { validatePartialPosts } from "../../posts/schemas/postsSchema.js";
import { PhotoVideoService } from "../../photoVideo/services/photoVideoService.js";

export const UploadFile = (file) => {
  if (!file) {
    return "No file uploaded";
  }
  return uploadFileToB2(file);
};

export class UploadFilesController {
  private postsService: PostsService;
  private photoVideoService: PhotoVideoService;
  private userService: UserService;

  addPostAndPhoto = async (req: Request, res: Response) => {
    const fileUrl = UploadFile(req.file);
    const validatePosts = validatePartialPosts(req.body);

    const Post = this.postsService.addPost({
      userId: validatePosts.data.userId,
      caption: validatePosts.data.caption,
      content: fileUrl.toString(),
      likes: 0,
      media: validatePosts.data.media
    });

    await Post.then((data) => {
      const photoVideo = this.photoVideoService.create({
        postsId: data.id,
        url: fileUrl.toString(),
        userId: data.userId,
      });

      photoVideo.then((data) => {
        res.status(200).json({ post: { photoVideo: data } });
      });
    });
  };

  addPhotoUser = async (req: Request, res: Response) => {
    const fileUrl = UploadFile(req.file);
    const user = this.userService.updatePhoto(
      fileUrl.toString(),
      req.params.userId
    );

    await user.then((data) => {
      const post = this.postsService.addPost({
        userId: data.id,
        caption: `${data.nameUser} upload is photo`,
        content: fileUrl.toString(),
        likes: 0,
        media:'photo',
      });

      post.then((data) => {
        const photoVideo = this.photoVideoService.create({
          postsId: data.id,
          url: fileUrl.toString(),
          userId: data.userId,
        });

        photoVideo.then((data) => {
          res.status(200).json({ post: { photoVideo: data } });
        });
      });
    });
  };
}
