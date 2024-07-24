import { User } from "../schemas/userSchema.js";
import { pool } from "../../../config/configMySql/config.js";
import { v4 as uuidv4 } from "uuid";
export class UserService {
  async getProfile(id: string) {
    try {
      const [user] = await pool.query[Symbol.iterator](
        "SELECT name,nameUser,photoUser, BIN_TO_UUID(id) id FROM users WHERE id=UUID_TO_BIN(?);",
        id
      );
      return user;
    } catch (err) {
      throw new Error("Error select user");
    }
  }

  async create(user: User) {
    const uuidR = uuidv4();
    const At = new Date();
    try {
      const [userExists] = await pool.query[Symbol.iterator](
        "SELECT name, nameUser, photoUser, email, password, id FROM users WHERE email=?;",
        user.email
      );

      if (userExists) throw new Error("user already exists");

      const [userInsert] = pool.query[Symbol.iterator](
        `INSERT INTO users (id, name, nameUser,photoUser, email,password,createAt) VALUES (${uuidR},?,?,?,?, ?, ?)`,
        [
          user.name,
          user.nameUser,
          user.photoUser,
          user.email,
          user.password,
          At,
        ]
      );
      return userInsert;
    } catch (err) {
      throw new Error("Error creating user");
    }
  }

  async update(user: User, id: string) {
    const setString = Object.keys(user)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(user);
    const [userUpdate] = await pool.query[Symbol.iterator](
      `UPDATE users SET ${setString} WHERE id = UUID_TO_BIN(?)`,
      [...values, id]
    );
    return userUpdate;
  }

  async updatePhoto(file: string, id: string) {
    const [userUpdate] = await pool.query[Symbol.iterator](
      `UPDATE users SET photoUser=? WHERE id = ?`,
      [file, id]
    );
    return userUpdate;
  }

  async delete(id: string) {
    try {
      const [userDelete] = await pool.execute[Symbol.iterator](
        "DELETE FROM users WHERE id=?",
        [id]
      );
      return userDelete;
    } catch (err) {
      throw new Error("Error deleting user");
    }
  }
}
