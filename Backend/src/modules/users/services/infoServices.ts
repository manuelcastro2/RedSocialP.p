import { Info } from "../schemas/infoSchema.js";
import InfoModel from "../models/infoModel.js";

export class InfoService {
  async getAll(userId: string) {
    return InfoModel.find({ userId: userId });
  }

  async addInfo(Input: Info) {
    const info = new InfoModel(Input);
    return info.save();
  }

  async Update(Input: Info) {
    return InfoModel.findOneAndUpdate({ userId: Input.userId }, Input);
  }
}
