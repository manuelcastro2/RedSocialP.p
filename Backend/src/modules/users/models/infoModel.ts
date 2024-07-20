import { Document, Schema } from "mongoose";
import mongooseConnection from "../../../config/configMongoDB/config.js";

interface Iinfo extends Document {
  userId:string,
  birthPlace: string,
  academic_training: string,
  contact: string,
  infoBasic: {
    sex: string,
    birthDate: Date,  
  }
}

const infoSchema: Schema = new Schema({
  senderId: { type: String },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  sendAt: { type: Date, required: true}
});

const Info = mongooseConnection.model<Iinfo>('Info', infoSchema

)

export default Info;