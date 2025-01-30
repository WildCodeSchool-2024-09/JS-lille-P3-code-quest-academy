import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Progress } from "../../types/express";

class ProgressRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from progress");
    return rows as Progress[];
  }
  //we get infos from connected user and store it into userContext
  async read(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM progress WHERE user_id = ?",
      [userId],
    );
    return rows[0] as Progress;
  }

  async update(progress: Omit<Progress, "id">) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE progress SET challenge_id = ? WHERE user_id = ?",
      [progress.challenge_id, progress.user_id],
    );
    return result.affectedRows;
  }

  // we get all game infos for a user by his progression
  async getPlayerProgress(userId: number, roomId: number, challengeId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT *
      FROM progress p
      JOIN challenge c ON p.challenge_id = c.id
      JOIN room r ON p.room_id = r.id
      WHERE p.user_id = ? AND p.room_id = ? AND p.challenge_id = ?`,
      [userId, roomId, challengeId],
    );
    return rows[0];
  }
}

export default new ProgressRepository();
