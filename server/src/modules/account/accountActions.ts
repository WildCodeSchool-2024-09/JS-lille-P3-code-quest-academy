import argon2 from "argon2";
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

const edit: RequestHandler = async (req, res, next) => {
  try {
    const accountId = Number(req.params.id);
    const { username, email, hashed_password } = req.body;

    if (!username || !email || !hashed_password) {
      res.status(400).json({
        success: false,
        message: "Tous les champs doivent être remplis",
      });
      return;
    }

    const affectedRows = await accountRepository.update({
      id: accountId,
      username,
      email,
      hashed_password,
    });

    if (affectedRows === 0) {
      res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });
    }
    res.status(200).json({
      success: true,
      message: "Utilisateur mis à jour avec succès",
      account: {
        id: accountId,
        username,
        email,
        hashed_password,
      },
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", err);
    next(err);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    // get password from request
    const { password } = req.body;

    if (!password) {
      res
        .status(400)
        .json({ success: false, message: "Le mot de passe est requis" });
    }
    // hash password with hashing option determined sooner
    const hashedPassword = await argon2.hash(password, hashingOptions);
    // replace clear password by hashed password
    req.body.hashed_password = hashedPassword;
    // erase clear password
    req.body.password = undefined;
    next();
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, hashed_password } = req.body;

    if (!username || !email || !hashed_password) {
      res.status(400).json({
        success: false,
        message: "Tous les champs doivent sont requis",
      });
    }

    const newAccount = { username, email, hashed_password };

    const insertId = await accountRepository.create(newAccount);
    res.status(201).json({ success: true, insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const accountId = Number(req.params.id);

    await accountRepository.delete(accountId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy, hashPassword };
