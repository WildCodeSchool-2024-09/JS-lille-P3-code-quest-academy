import type { RequestHandler } from "express";
import progressRepository from "../progress/progressRepository";

const getProgressByUserId: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const progress = await progressRepository.getPlayerProgress(Number(userId));
    if (!progress) {
      res.status(404).json({ message: "Progress not found" });
    } else {
      res.status(200).json(progress);
    }
  } catch (error) {
    next(error);
  }
};

export default { getProgressByUserId };
