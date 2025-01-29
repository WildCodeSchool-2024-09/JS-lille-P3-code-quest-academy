import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Challenge = {
  id: number;
  title: string;
  user_id: number;
};

class ChallengeRepository {
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific challenge by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from challenge where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the challenge
    return rows[0] as Challenge;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all challenges from the "challenge" table
    const [rows] = await databaseClient.query<Rows>("select * from challenge");

    // Return the array of challenges
    return rows as Challenge[];
  }
}

export default new ChallengeRepository();
