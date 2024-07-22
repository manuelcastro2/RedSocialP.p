import { Document, Schema } from "mongoose";
import mongooseConnection from "../../../config/configMongoDB/config.js";

interface Iphotovideo extends Document {
  postsId: string;
  userId: string;
  url: string;
  createAt:Date
}

const photoShema: Schema = new Schema({
  postId: { type: String },
  userId: { type: String, required: true },
  url: { type: String },
  createAt: { type: Date},
});

const PhotoModel = mongooseConnection.model<Iphotovideo>('PhotoVideo', photoShema)

export default PhotoModel;

