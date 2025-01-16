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
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
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
      password,
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
        password,
      },
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", err);
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newAccount = {
      id: Number(req.params.id),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const insertId = await accountRepository.create(newAccount);
    res.status(201).json({ insertId });
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

export default { browse, read, edit, add, destroy };
