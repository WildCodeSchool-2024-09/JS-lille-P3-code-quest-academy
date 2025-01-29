import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Progress = {
  id: number;
  challenge_id: number;
  user_id: number;
};

class ProgressRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from progress");
    return rows as Progress[];
  }
  //sert à recuperer les infos de l'utilisateur connecté pour les stocker dans userContext
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

  // on recupère toutes les infos du jeu pour un utilisateur donné par rapport à sa progression
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
