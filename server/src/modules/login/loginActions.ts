import argon2 from "argon2";
import type { RequestHandler } from "express";
import accountRepository from "../account/accountRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await accountRepository.readByEmailWithPassword(
      req.body.email,
    );

    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password,
    );

    if (verified) {
      const { hashed_password, ...userWithoutHashedPassword } = user;

      res.json(userWithoutHashedPassword);
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

export default { login };
