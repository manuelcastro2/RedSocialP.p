import {
  validateMessages,
  validatePartialMessages,
} from "../schemas/messagesSchema.js";
import Messages from "../models/messagesModel.js";

export class MessagesService {
  static async getAll(senderId: string, receiverId: string) {
    const messagesSendValidate = validatePartialMessages({
      senderId: senderId,
      receiverId: receiverId,
    });
    return await Messages.find({
      senderId: messagesSendValidate.data.sederId,
      receiverId: messagesSendValidate.data.receiverId,
    });
  }

  static async create(Input: object) {
    const messagesValidate = validateMessages(Input);
    const messages = new Messages(messagesValidate.data);
    return await messages.save();
  }

  static async delete(id: string) {
    const messages = await Messages.deleteOne({ _id: id });
    return messages;
  }
}
