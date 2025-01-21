import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Progress = {
  id: number;
  username: string;
  email: string;
  password: string;
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
}

export default new ProgressRepository();
