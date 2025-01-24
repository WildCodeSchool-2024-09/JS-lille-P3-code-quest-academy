import argon2 from "argon2";
import type { RequestHandler } from "express";
import accountRepository from "./accountRepository";

type Account = {
  id: number;
  username: string;
  email: string;
  password: string;
  teacher_1: string;
  teacher_2: string;
};

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

    const account = await accountRepository.read(accountId);
    const affectedRows = await accountRepository.update({
      id: accountId,
      username,
      email,
      hashed_password,
      teacher_1: account.teacher_1,
      teacher_2: account.teacher_2,
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

const editInfos: RequestHandler = async (req, res, next) => {
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

    const account = await accountRepository.read(accountId);
    const affectedRows = await accountRepository.updateInfos({
      id: accountId,
      username,
      email,
      hashed_password,
      teacher_1: account.teacher_1,
      teacher_2: account.teacher_2,
    });

    if (affectedRows === 0) {
      res.status(404).json({ success: false, message: "Compte non trouvé" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Informations mises à jour avec succès",
      data: { id: accountId, username, email, hashed_password },
    });
  } catch (err) {
    next(err);
  }
};

const editTrainers: RequestHandler = async (req, res, next) => {
  try {
    const accountId = Number(req.params.id);
    const { teacher_1, teacher_2 } = req.body;

    if (!teacher_1 || !teacher_2) {
      res.status(400).json({
        success: false,
        message: "Tous les champs doivent être remplis",
      });
      return;
    }

    const account = await accountRepository.read(accountId);
    if (!account) {
      res.status(404).json({ success: false, message: "Compte non trouvé" });
      return;
    }

    const affectedRows = await accountRepository.updateTrainers({
      ...account,
      teacher_1,
      teacher_2,
    });

    if (affectedRows === 0) {
      res.status(404).json({ success: false, message: "Compte non trouvé" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Formateurs mis à jour avec succès",
      data: { id: accountId, teacher_1, teacher_2 },
    });
  } catch (err) {
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
    const newAccount = {
      username: req.body.username,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      teacher_1: req.body.teacher_1,
      teacher_2: req.body.teacher_2,
    };

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

export default {
  browse,
  read,
  editTrainers,
  edit,
  editInfos,
  add,
  destroy,
  hashPassword,
};
