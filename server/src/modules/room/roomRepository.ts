import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Room = {
  id: number;
  boss: string;
  img_url: string;
};

class RoomRepository {
    async read(id: number){
        const [rows] = await databaseClient.query<Rows>(
            "SELECT * FROM room WHERE id = ?", [id] 
        );
        return rows[0] as Room;
    }
}

export default new RoomRepository();