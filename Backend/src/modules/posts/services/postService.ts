import { pool } from "./../../../config/configMySql/config.js";
import { Post } from "../schemas/postsSchema.js";

export class PostsService {
  async addPost(post: Post) {
    const [uuidR] = await pool.query[Symbol.iterator]("SELECT UUID() uuid;");
    const [{ uuid }] = uuidR;

    const [postsInsert] = await pool.query[Symbol.iterator](
      `INSERT INTO posts (id,userId, content,media,caption,createAt,likes) 
      VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?),?,?,?,?,?)`,
      [
        uuid,
        post.userId,
        post.content,
        post.media,
        post.caption,
        post.createAt,
        0,
      ]
    );
    return postsInsert;
  }

  async getById(id: string) {
    const [posts] = await pool.query[Symbol.iterator](
      "SELECT content,media, caption, createAt,likes,BIN_TO_UUID(id) id FROM posts WHERE id=UUID_TO_BIN(?);",
      id
    );
    return posts;
  }

  async getAll(userId: string) {
    const [posts] = await pool.query[Symbol.iterator](
      "SELECT content,media, caption, createAt,BIN_TO_UUID(userId) userId, BIN_TO_UUID(id) id FROM posts where id =UUID_TO_BIN(?)",
      userId
    );
    return posts;
  }

  async removePost(id: string) {
    const [postsDelete] = await pool.query[Symbol.iterator](
      "DELETE FROM posts WHERE id = UUID_TO_BIN(?)",
      id
    );
    return postsDelete;
  }
}
