import { pool } from "../../../config/configMySql/config.js";
import { Friend } from "../schemas/friendsSchema.js";
import { v4 as uuidv4 } from "uuid";

export class FriendsService {
  async getFriendsByUserId(userId: string) {
    const [friends] = await pool.query[Symbol.iterator](
      `SELECT BIN_TO_UUID(f.friendId) AS friendId, u.name, u.nameUser, u.email
    FROM friends f
    JOIN users u ON f.friendId = u.id
    WHERE f.userId = UUID_TO_BIN(?)
  `,
      [userId]
    );
    return friends;
  }

  async addFriend(friendData: Friend) {
    const At = new Date();
    const uuidR = uuidv4();

    const [friends] = await pool.query[Symbol.iterator](
      `INSERT INTO friends (id,userId, friendId,status,createAt) 
      VALUES (?, ?,?,?)`,
      [uuidR,friendData.userId, friendData.friendId, friendData.status,At]
    );
    return friends;
  }

  async removeFriend(userId: string, friendId: string) {
    const [friends] = await pool.query[Symbol.iterator](
      "DELETE FROM friends WHERE userId = UUID_TO_BIN(?) AND friendId = UUID_TO_BIN(?)",
      [userId, friendId]
    );
    return friends;
  }
}
