import { pool } from "../../../../config/configMySql/config.js";

export class AuthService {
  async login(email: string, password: string) {
    try {
      const [user] = await pool.query[Symbol.iterator](
        "SELECT name, nameUser, photoUser, email, password, BIN_TO_UUID(id) id FROM users WHERE email=?,password=?;",
        [email, password]
      );
      return user;
    } catch (e) {
      throw new Error("User not found");
    }
  }
}
