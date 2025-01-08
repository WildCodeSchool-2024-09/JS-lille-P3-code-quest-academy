import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Account = {
  id: number;
  username: string;
  email: string;
  password: string;
};class AccountRepository {
  async create(account: Account) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO account (username, email, password) VALUE (?, ?, ?)",
      [account.username, account.email, account.password],
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from account");
    return rows as Account[];
  }
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM account WHERE id = ?",
      [id],
    );
    return rows[0] as Account;
  }
}

export default new AccountRepository();
