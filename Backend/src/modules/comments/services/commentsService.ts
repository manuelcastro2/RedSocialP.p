import { pool } from "./../../../config/configMySql/config.js";
import { Comments } from "../schemas/commentsSchema.js";
import { v4 as uuidv4 } from "uuid";

export class CommentsService {
  async addComments(comments: Comments) {
    const uuidR = uuidv4();
    const At = new Date();

    const [commentInsert] = await pool.query[Symbol.iterator](
      `INSERT INTO comments (id,postId, userId,content,sendAt) 
      VALUES (?,?,?,?,?)`,
      [
        uuidR,
        comments.postId,
        comments.userId,
        comments.content,
        At,
      ]
    );
    return commentInsert;
  }

  async getAll(postId: string) {
    const [comments] = await pool.query[Symbol.iterator](
      `SELECT BIN_TO_UUID(id) id,BIN_TO_UUID(postId) postId,content,sendAt,nameUser,name, BIN_TO_UUID(userId) userId 
      FROM comments c JOIN posts p ON c.postId=p.id WHERE c.postId=UUID_TO_BIN(?)`,
      postId
    );
    return comments;
  }

  async deleteComments(id: string) {
    const [postsDelete] = await pool.query[Symbol.iterator](
      "DELETE FROM comments WHERE id = UUID_TO_BIN(?)",
      id
    );
    return postsDelete;
  }
}
