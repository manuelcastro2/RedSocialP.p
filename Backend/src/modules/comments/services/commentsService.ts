import { pool } from "./../../../config/configMySql/config.js";
import { Comments } from "../schemas/commentsSchema.js";

export const addComments = async (comments: Comments) => {
  const [uuidR] = await pool.query[Symbol.iterator]("SELECT UUID() uuid;");
  const [{ uuid }] = uuidR;

  const [commentInsert] = await pool.query[Symbol.iterator](
    `INSERT INTO comments (id,postId, userId,content,sendAt) 
    VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),UUID_TO_BIN(?),?,?)`,
    [uuid, comments.postId, comments.userId, comments.content, comments.sendAt]
  );
  return commentInsert;
};

export const getAll = async (userId: string) => {
  const [comments] = await pool.query[Symbol.iterator](
    `SELECT BIN_TO_UUID(id) id,BIN_TO_UUID(postId) postId,content,sendAt,nameUser,name, BIN_TO_UUID(userId) userId 
    FROM comments c JOIN users u ON c.UserId=u.id WHERE c.userId=UUID_TO_BIN(?)`,
    userId
  );
  return comments;
};

export const deleteComments = async (id: string) => {
  const [postsDelete] = await pool.query[Symbol.iterator](
    "DELETE FROM comments WHERE id = UUID_TO_BIN(?)",
    id
  );
  return postsDelete;
};
