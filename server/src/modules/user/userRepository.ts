import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

class UserRepository {
  async create(user: User) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO account (username, email, password) VALUE (?, ?, ?)",
      [user.username, user.email, user.password],
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from account");
    return rows as User[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM account WHERE id = ?",
      [id],
    );
    return rows[0] as User;
  }

  async update(user: User) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE account SET username = ?, email = ?, password = ? WHERE id = ?",
      [user.username, user.email, user.password, user.id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM account WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new UserRepository();
