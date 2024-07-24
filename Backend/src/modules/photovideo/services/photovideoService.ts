import PhotoModel from "../models/photoVideoModel.js";
import { PhotoVideo } from "../schemas/photoVideoSchema.js";

export class PhotoVideoService {
  async getAll(userId: string) {
    return PhotoModel.find({ userId: userId });
  }

  async create(Input: PhotoVideo) {
    const At = new Date();
    const photoVideo={
      postsId:Input.postsId,
      userId:Input.userId,
      url:Input.url,
      createAt:At
    }

    const photo = new PhotoModel(photoVideo);
    return photo.save();
  }

  async delete(id:string) {
    return PhotoModel.findByIdAndDelete(id);
  }
}
