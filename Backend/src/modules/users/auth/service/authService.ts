import pool from "../../../../config/configMySql/config.js";

export class AuthService {
  async login(email: string, password: string) {
    try {
      const [user] = await pool.query(
        "SELECT name, nameUser, photoUser, email, password, id FROM users WHERE email=? and password=?;",
        [email, password]
      );
      return user;
    } catch (e) {
      throw new Error("User not found");
    }
  }
}
