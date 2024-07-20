import Info from "../models/infoModel.js";
import { validatePartialInfo } from "../schemas/infoSchema.js";

export class InfoService {
  static async getAll(userId: string) {
    const infoValidate = validatePartialInfo({ userId: userId });
    return await Info.find({ userId: infoValidate.data.userId });
  }

  static async Update(Input: object) {
    const infoValidate = validatePartialInfo(Input);
    return await Info.updateOne({userId:infoValidate.data.userId});
  }

}
