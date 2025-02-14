import type { RequestHandler } from "express";

// Import access to data
import challengeRepository from "./challengeRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all challenges
    const challenges = await challengeRepository.readAll();

    // Respond with the challenges in JSON format
    res.json(challenges);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific challenge based on the provided ID
    const challengeId = Number(req.params.id);
    const challenge = await challengeRepository.read(challengeId);

    // If the challenge is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the challenge in JSON format
    if (challenge == null) {
      res.sendStatus(404);
    } else {
      res.json(challenge);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read };
