import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { Account } from "../../types/types";

class AccountRepository {
  async create(account: Omit<Account, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO account (username, email, hashed_password) VALUE (?, ?, ?)",
      [account.username, account.email, account.hashed_password],
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
  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM account WHERE email = ?",
      [email],
    );
    return rows[0] as Account;
  }

  async update(account: Account) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE account SET username = ?, email = ?, hashed_password = ? WHERE id = ?",
      [account.username, account.email, account.hashed_password, account.id],
    );
    return result.affectedRows;
  }

  async updateInfos(account: Account) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE account SET username = ?, email = ?, hashed_password = ? WHERE id = ?",
      [account.username, account.email, account.hashed_password, account.id],
    );
    return result.affectedRows;
  }

  async updateTrainers(account: Account) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE account SET firstTeacher = ?, secondTeacher = ? WHERE id = ?",
      [account.firstTeacher, account.secondTeacher, account.id],
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

export default new AccountRepository();
