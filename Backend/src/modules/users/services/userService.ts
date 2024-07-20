import { IUsers } from "./../models/userModel.js";
import { pool } from "../../../config/configMySql/config.js";
import { RowDataPacket } from "mysql2";

export class UserService {
  static async getProfile(id: string): Promise<IUsers | null> {
    try {
      const user = await pool.query<[RowDataPacket[]]>(
        "SELECT name,nameUser, BIN_TO_UUID(id) id FROM users WHERE id=UUID_TO_BIN(?);",
        id
      );

      if (user) return null;
      return user[0] as IUsers;
    } catch (err) {
      console.error("Error fetching user by ID:", err);
      throw new Error("Error fetching user by ID");
    }
  }

  static async create(user: {
    name: string;
    nameUser: string;
    email: string;
    password: string;
  }): Promise<IUsers> {
    const uuid = await pool.query("SELECT UUID() uuid;");

    try {
      const At = new Date();

      await pool.execute(
        `INSERT INTO users (id, name, nameUser, email,password,createAt) VALUES (UUID_TO_BIN(UUID(${uuid})), ?,?,?, ?, ?)`,
        [user.name, user.nameUser, user.email, user.password, At]
      );
    } catch (e) {
      throw new Error("Error creating movie");
    }

    const userRes = await pool.query(
      "SELECT name,nameUser, BIN_TO_UUID(id),email,password,createAt id FROM users WHERE id=UUID_TO_BIN(?);",
      uuid
    );

    if (userRes) return null;
    return userRes[0] as IUsers;
  }

  static async update(
    user: {
      name: string;
      nameUser: string;
      email: string;
      password: string;
    },
    id: string
  ): Promise<IUsers> {
    try {
      const fields = [];
      const values = [];

      if (user.name) {
        fields.push("name = ?");
        values.push(user.name);
      }
      if (user.nameUser) {
        fields.push("nameUser = ?");
        values.push(user.nameUser);
      }
      if (user.email) {
        fields.push("email = ?");
        values.push(user.email);
      }
      if (user.password) {
        fields.push("password = ?");
        values.push(user.password);
      }
      if (fields.length === 0) {
        throw new Error("No fields to update");
      }

      values.push(id);
      const userRes = await pool.execute(
        `UPDATE users SET ${fields.join(", ")} WHERE id=UUID_TO_BIN(?)`,
        values
      );

      if (userRes) return null;
      return userRes[0] as IUsers;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Error updating user");
    }
  }

  static async delete(id: string): Promise<IUsers> {
    try {
      const userRes = await pool.execute(
        "DELETE FROM users WHERE id=UUID_TO_BIN(?)",
        [id]
      );
      if (userRes) return null;
      return userRes[0] as IUsers;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Error deleting user");
    }
  }
}
