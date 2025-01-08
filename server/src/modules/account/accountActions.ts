import type { RequestHandler } from "express";
import accountRepository from "./accountRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const accounts = await accountRepository.readAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const accountId = Number(req.params.id);
    const account = await accountRepository.read(accountId);

    if (account == null) {
      res.sendStatus(404);
    } else {
      res.json(account);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
