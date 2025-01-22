import type { RequestHandler } from "express";
import roomRepository from "./roomRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const roomId = Number(req.params.id);
    const room = await roomRepository.read(roomId);

    if (room == null) {
      res.sendStatus(404);
    } else {
      res.json(room);
    }
  } catch (error) {
    next(error);
  }
};

export default { read };
