import { Document, Schema } from "mongoose";
import mongooseConnection from "../../../config/configMongoDB/config.js";

interface Imessages extends Document {
  senderId: string;
  receiverId: string;
  content: string;
  sendAt: Date
}

const messagesSchema: Schema = new Schema({
  senderId: { type: String },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  sendAt: { type: Date, required: true}
});

const Messages = mongooseConnection.model<Imessages>('messages', messagesSchema)

export default Messages;