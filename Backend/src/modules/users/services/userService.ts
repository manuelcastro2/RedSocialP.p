import { User } from "./../schemas/userSchema.js";
import { pool } from "../../../config/configMySql/config.js";

export class UserService {
  static async getProfile(id: string) {
    try {
      const [user] = await pool.query[Symbol.iterator](
        "SELECT name,nameUser, BIN_TO_UUID(id) id FROM users WHERE id=UUID_TO_BIN(?);",
        id
      );
      return user;
    } catch (err) {
      throw new Error("Error select user");
    }
  }

  static async create(user: User) {
    const [uuidR] = await pool.query[Symbol.iterator]("SELECT UUID() uuid;");
    const [{ uuid }] = uuidR;
    const At = new Date();
    try {
      const [userInsert] = pool.query[Symbol.iterator](
        `INSERT INTO users (id, name, nameUser, email,password,createAt) VALUES (UUID_TO_BIN(UUID(${uuid})), ?,?,?, ?, ?)`,
        [user.name, user.nameUser, user.email, user.password, At]
      );
      return userInsert;
    } catch (err) {
      throw new Error("Error creating user");
    }
  }

  static async update(user: User, id: string) {
    const setString = Object.keys(user).map(key => `${key} = ?`).join(', ');
    const values = Object.values(user)
    const [userUpdate] = await pool.query[Symbol.iterator](
      `UPDATE users SET ${setString} WHERE id = UUID_TO_BIN(?)`, [...values, id]);
  return userUpdate
  }

  static async delete(id: string) {
    try {
      const [userDelete] = await pool.execute[Symbol.iterator](
        "DELETE FROM users WHERE id=UUID_TO_BIN(?)",
        [id]
      );
      return userDelete;
    } catch (err) {
      throw new Error("Error deleting user");
    }
  }
}
