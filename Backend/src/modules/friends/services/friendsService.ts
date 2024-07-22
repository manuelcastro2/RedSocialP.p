import { pool } from "../../../config/configMySql/config.js";
import { Friend } from "../schemas/friendsSchema.js";

export class FriendsService {
  async getFriendsByUserId(userId: string) {
    const [friends] = await pool.query[Symbol.iterator](
      `SELECT BIN_TO_UUID(f.friendId) AS friendId, u.name, u.username, u.email
    FROM friends f
    JOIN users u ON f.friendId = u.id
    WHERE f.userId = UUID_TO_BIN(?)
  `,
      [userId]
    );
    return friends;
  }

  async addFriend(friendData: Friend) {
    const [friends] = await pool.query[Symbol.iterator](
      `INSERT INTO friends (user_id, friend_id,status) 
      VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?),?)`,
      [friendData.userId, friendData.friendId, friendData.status]
    );
    return friends;
  }

  async removeFriend(userId: string, friendId: string) {
    const [friends] = await pool.query[Symbol.iterator](
      "DELETE FROM friends WHERE user_id = UUID_TO_BIN(?) AND friend_id = UUID_TO_BIN(?)",
      [userId, friendId]
    );
    return friends;
  }
}
