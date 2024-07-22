import PhotoModel from "../models/photoVideoModel.js";
import { PhotoVideo } from "../schemas/photoVideoSchema.js";

export class PhotoVideoService {
  async getAll(userId: string) {
    return PhotoModel.find({ userId: userId });
  }

  async create(Input: PhotoVideo) {
    const photo = new PhotoModel(Input);
    return photo.save();
  }

  async delete(id:string) {
    return PhotoModel.findByIdAndDelete(id);
  }
}
