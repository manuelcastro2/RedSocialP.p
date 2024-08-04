import pool from "../../../config/configMySql/config.js";
import { Friend } from "../schemas/friendsSchema.js";
import { v4 as uuidv4 } from "uuid";

export class FriendsService {
  async getFriendsByUserId(userId: string) {
    const [friends] = await pool.query(
      `SELECT f.friendId AS friendId, u.name, u.nameUser, u.email
    FROM friends f
    JOIN users u ON f.friendId = u.id
    WHERE f.userId = ?
  `,
      [userId]
    );
    return friends[0];
  }

  async addFriend(friendData: Friend) {
    const At = new Date();
    const uuidR1 = uuidv4();
    const uuidR2 = uuidv4();

    const [friendsConsult] = await pool.query(
      `SELECT COUNT(*) AS count FROM friends f
    JOIN users u ON f.friendId = u.id
    WHERE f.userId = ? and f.friendId = ?
  `,
      [friendData.userId, friendData.friendId]
    );

    if (friendsConsult[0].count == 0) {
      pool.query(
        `INSERT INTO friends (id,userId, friendId,status,createAt) 
        VALUES (?,?,?,?,?)`,
        [uuidR1, friendData.userId, friendData.friendId, friendData.status, At]
      );

      pool.query(
        `INSERT INTO friends (id,userId, friendId,status,createAt) 
        VALUES (?,?,?,?,?)`,
        [uuidR2, friendData.friendId, friendData.userId, friendData.status, At]
      );
    }

    const [friends] = await pool.query(
      `SELECT f.friendId , u.name, u.nameUser, u.email
    FROM friends f JOIN users u ON f.friendId = u.id
    WHERE f.userId = ?
  `,
      [friendData.userId]
    );
    return friends[0];
  }

  async removeFriend(userId: string, friendId: string) {
   await pool.query(
      "DELETE FROM friends WHERE userId = ? AND friendId = ?",
      [userId, friendId]
    );

    await pool.query(
      "DELETE FROM friends WHERE userId = ? AND friendId = ?",
      [friendId, userId]
    );
    return "friend eliminated";
  }
}
