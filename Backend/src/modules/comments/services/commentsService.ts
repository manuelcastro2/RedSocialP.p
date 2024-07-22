import { pool } from "./../../../config/configMySql/config.js";
import { Comments } from "../schemas/commentsSchema.js";

export class CommentsService {
  async addComments(comments: Comments) {
    const [uuidR] = await pool.query[Symbol.iterator]("SELECT UUID() uuid;");
    const [{ uuid }] = uuidR;

    const [commentInsert] = await pool.query[Symbol.iterator](
      `INSERT INTO comments (id,postId, userId,content,sendAt) 
      VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),UUID_TO_BIN(?),?,?)`,
      [
        uuid,
        comments.postId,
        comments.userId,
        comments.content,
        comments.sendAt,
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
