import { Info } from "../schemas/infoSchema.js";
import InfoModel from "../models/infoModel.js";

export class InfoService {
  async getByUser(userId: string) {
    return InfoModel.find({ userId: userId });
  }

  async addInfo(Input: Info) {
    const info = new InfoModel(Input);
    return info.save();
  }

  async Update(Input: Info) {
    console.log(Input);
    
    const update=InfoModel.updateOne({ userId: Input.userId }, Input);
    if((await update).modifiedCount>0){
      return InfoModel.find({ userId: Input.userId})
    }
  }
}
