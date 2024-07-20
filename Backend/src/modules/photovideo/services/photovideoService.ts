import {
  validatePartialPhotovideo,
  validatePhotovideo,
} from "../schemas/photoVideoSchema.js";
import Photo from "../models/photoVdeoModel.js";

export class PhotoVideoService {
  static async getAll(userId: string) {
    const photoUserValidate = validatePartialPhotovideo({ userId: userId });
    return await Photo.find({ userId: photoUserValidate.data.userId });
  }

  static async create(Input: object) {
    const photoValidate = validatePhotovideo(Input);
    const photo = new Photo(photoValidate.data);
    return await photo.save();
  }

  static async delete(id: string) {
    const photo = await Photo.deleteOne({ _id: id });
    return photo;
  }
}
