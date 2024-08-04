import MessagesModel from "../models/messagesModel.js";
import { Messages } from "../schemas/messagesSchema.js";

export class MessagesService {
  async getAll(senderId: string, receiverId: string) {
    return MessagesModel.find({
      senderId: senderId,
      receiverId: receiverId,
    });
  }

  async create(Input: Messages) {
    const At = new Date();
    const messages = new MessagesModel({
      senderId: Input.sederId,
      receiverId: Input.receiverId,
      content: Input.content,
      sendAt: At,
    });
    return messages.save();
  }

  async delete(id: string) {
    return MessagesModel.deleteOne({ _id: id });
  }
}
