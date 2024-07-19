import {
  validatePartialPhotovideo,
  validatePhotovideo,
} from "../models/photoVdeoModel.js";
import Photo from "../schema/photoVideoSchema.js";

export class PhotoVideoService {
  static async getAll(userId: string) {
    const photoUserValidate = validatePartialPhotovideo({ userId: userId });
    return await Photo.find({ userId: photoUserValidate });
  }

  static async create(Input: object) {
    const photoValidate = validatePhotovideo(Input);
    const photo = new Photo(photoValidate);
    return await photo.save();
  }

  static async delete(id: string) {
    const photo = await Photo.deleteOne({ _id: id });
    return photo;
  }
}
