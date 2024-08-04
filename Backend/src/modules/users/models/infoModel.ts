import { Document, Schema } from "mongoose";
import mongooseConnection from "../../../config/configMongoDB/config.js";

interface Iinfo extends Document {
  userId: string;
  birthPlace?: string;
  academicStudies?: string;
  contact?: string;
  infoBasic?: {
    sex?: string;
    birthDate?: Date;
  };
}

const infoSchema: Schema = new Schema({
  userId: { type: String, required: true },
  birthPlace: { type: String },
  academicStudies: { type: String },
  contact: { type: String },
  infoBasic: {
    sex: { type: String },
    birthDate: { type: Date },
  },
});

const InfoModel = mongooseConnection.model<Iinfo>("Info", infoSchema);

export default InfoModel;
