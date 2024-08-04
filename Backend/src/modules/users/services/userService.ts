import { User } from "../schemas/userSchema.js";
import pool from "../../../config/configMySql/config.js";
import { v4 as uuidv4 } from "uuid";
import { OkPacket } from "mysql2";

export class UserService {
  async getProfile(id: string) {
    try {
      const [user] = await pool.query(
        "SELECT name,nameUser,photoUser, id FROM users WHERE id=?;",
        id
      );
      return user[0];
    } catch (err) {
      throw new Error("Error select user");
    }
  }

  async create(user: User) {
    const uuidR = uuidv4();
    const At = new Date();
    try {
      const [userExist] = await pool.query(
        "SELECT COUNT(*) AS count FROM users WHERE email=? and nameUser=?;",
        [user.email, user.nameUser]
      );

     console.log(userExist[0].count);
     
      

      if (userExist[0].count>0) {
        throw new Error("User already exists");
      }

      await pool.query(
        `INSERT INTO users (id, name, nameUser,photoUser, email,password,createAt) VALUES (?,?,?,?,?, ?, ?)`,
        [
          uuidR,
          user.name,
          user.nameUser,
          user.photoUser,
          user.email,
          user.password,
          At,
        ]
      );
      const [userR] = await pool.query(
        "SELECT name,nameUser,photoUser,email,password,createAt,id id FROM users WHERE id=?;",
        uuidR
      );
      return userR[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(user: User, id: string) {
    const setString = Object.keys(user)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(user);
    await pool.query(`UPDATE users SET ${setString} WHERE id = ?`, [
      ...values,
      id,
    ]);
    const [userR] = await pool.query(
      "SELECT name,nameUser,photoUser, id id FROM users WHERE id=?;",
      [id]
    );
    return userR[0];
  }

  async updatePhoto(file: string, id: string) {
    await pool.query(`UPDATE users SET photoUser=? WHERE id = ?`, [file, id]);
    const [userR] = await pool.query(
      "SELECT name,nameUser,photoUser, id FROM users WHERE id=?;",
      [id]
    );
    return userR[0];
  }

  async delete(id: string) {
    try {
      const [userDelete] = await pool.query("DELETE FROM users WHERE id=?", [
        id,
      ]);
      return userDelete[0];
    } catch (err) {
      throw new Error("Error deleting user");
    }
  }
}
