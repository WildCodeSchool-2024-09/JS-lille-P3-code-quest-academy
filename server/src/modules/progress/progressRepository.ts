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

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM progress WHERE id = ?",
      [id],
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
}

export default new ProgressRepository();
