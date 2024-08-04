import pool from "./../../../config/configMySql/config.js";
import { Comments } from "../schemas/commentsSchema.js";
import { v4 as uuidv4 } from "uuid";

export class CommentsService {
  async addComments(comments: Comments) {
    const uuidR = uuidv4();
    const At = new Date();

    await pool.query(
      `INSERT INTO comments (id,postId, userId,content,sendAt) 
      VALUES (?,?,?,?,?)`,
      [uuidR, comments.postId, comments.userId, comments.content, At]
    );

    const [commentsConsult] = await pool.query(
      `SELECT id, postId,content,sendAt, userId 
      FROM comments WHERE id=?`,
      uuidR
    );
    return commentsConsult[0];
  }

  async getAll(postId: string) {
    const [comments] = await pool.query(
      `
        SELECT 
            c.id AS commentId,
            p.id AS postId,
            c.content,
            c.sendAt,
            u.name AS userName,
            u.nameUser,
            u.photoUser,
            u.email,
            u.createAt AS userCreatedAt
        FROM 
            comments c 
        JOIN 
            posts p ON c.postId = p.id
        JOIN 
            users u ON c.userId = u.id
        WHERE 
            p.id = ?
    `,
      postId
    );
    return comments[0];
  }

  async deleteComments(id: string) {
    const [postsDelete] = await pool.query(
      "DELETE FROM comments WHERE id = ?",
      id
    );
    return postsDelete;
  }
}
