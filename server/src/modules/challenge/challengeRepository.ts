import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Challenge = {
  id: number;
  title: string;
  user_id: number;
};

class ChallengeRepository {
  // The C of CRUD - Create operation

  //   async create(challenge: Omit<Challenge, "id">) {
  //     // Execute the SQL INSERT query to add a new challenge to the "challenge" table
  //     const [result] = await databaseClient.query<Result>(
  //       "insert into challenge (title, user_id) values (?, ?)",
  //       [challenge.title, challenge.user_id],
  //     );

  //     // Return the ID of the newly inserted challenge
  //     return result.insertId;
  //   }

  // The Rs of CRUD - Read operations

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

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing challenge

  // async update(challenge: Challenge) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an challenge by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new ChallengeRepository();
