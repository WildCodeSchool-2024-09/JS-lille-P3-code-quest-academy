import type { RequestHandler } from "express";
import challengeRepository from "../challenge/challengeRepository";
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
    const userId = Number(req.params.id);
    const progress = await progressRepository.read(Number(userId));

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
    const userId = Number(req.params.userId);
    const challengeId = Number(req.params.challengeId) + 1;
    const affectedRows = await progressRepository.update({
      user_id: userId,
      challenge_id: challengeId,
    });

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      const challenge = await challengeRepository.read(challengeId);
      res.json(challenge);
    }
  } catch (error) {
    next(error);
  }
};

const chooseChallenge: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const challengeId = Number(req.body.challengeId);

    const affectedRows = await progressRepository.selfUpdate(
      challengeId,
      userId,
    );

    if (affectedRows === 0) {
      res.sendStatus(404).json({ message: "Challenge cannot be updated" });
    } else {
      const challenge = await challengeRepository.read(challengeId);
      res.json(challenge);
    }
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, chooseChallenge };
