import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Progress = {
  id: number;
  level: number;
};
class ProgressRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from progress");
    return rows as Progress[];
  }

  async read(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM progress WHERE user_id = ?",
      [userId],
    );
    return rows[0] as Progress;
  }

  async update(progress: Progress) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE progress SET level = ? WHERE id = ?",
      [progress.level, progress.id],
    );
    return result.affectedRows;
  }

  async getPlayerProgress(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT *
      FROM progress p
      JOIN challenge c ON p.challenge_id = c.id
      JOIN room r ON p.room_id = r.id
      WHERE p.user_id = ?`,
      [userId],
    );
    return rows;
  }
}

export default new ProgressRepository();
