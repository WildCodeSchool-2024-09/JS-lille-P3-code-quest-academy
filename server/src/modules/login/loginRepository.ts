import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

class LoginRepository {
  async getUser(email: string, password: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM account WHERE email = ? AND password = ?",
      [email, password],
    );
    return rows[0];
  }
}

export default new LoginRepository();
