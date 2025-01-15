import type { RequestHandler } from "express";
import progressRepository from "./progressRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const progress = await progressRepository.readAll();
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const progressId = Number(req.params.id);
    const progress = await progressRepository.read(progressId);

    if (progress == null) {
      res.sendStatus(404);
    } else {
      res.json(progress);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const progressId = Number(req.params.id);
    const level = Number(req.body.level);
    const affectedRows = await progressRepository.update({
      id: progressId,
      level,
    });

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};
export default { browse, read, edit };
