import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type { Room } from "../../types/express/index.d.ts";


class RoomRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM room WHERE id = ?",
      [id],
    );
    return rows[0] as Room;
  }
}

export default new RoomRepository();
