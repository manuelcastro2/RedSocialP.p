import { pool } from "./../../../config/configMySql/config.js";
import { Post } from "../schemas/postsSchema.js";
import { v4 as uuidv4 } from "uuid";

export class PostsService {

  async getAll(userId: string) {
    const [posts] = await pool.query[Symbol.iterator](
      "SELECT content,media, caption, createAt,BIN_TO_UUID(userId) userId, BIN_TO_UUID(id) id FROM posts where id =UUID_TO_BIN(?)",
      userId
    );
    return posts;
  }
  
  async getById(id: string) {
    const [posts] = await pool.query[Symbol.iterator](
      "SELECT content,media, caption, createAt,likes,BIN_TO_UUID(id) id FROM posts WHERE id=UUID_TO_BIN(?);",
      id
    );
    return posts;
  }

  async addPost(post: Post) {
    const uuidR = uuidv4();
    const At = new Date();  

    const [postsInsert] = await pool.query[Symbol.iterator](
      `INSERT INTO posts (id,userId, content,media,caption,createAt,likes) 
      VALUES (?,?,?,?,?,?,?)`,
      [
        uuidR,
        post.userId,
        post.content,
        post.media,
        post.caption,
        At,
        0,
      ]
    );
    return postsInsert;
  }

  async removePost(id: string) {
    const [postsDelete] = await pool.query[Symbol.iterator](
      "DELETE FROM posts WHERE id = UUID_TO_BIN(?)",
      id
    );
    return postsDelete;
  }
}
