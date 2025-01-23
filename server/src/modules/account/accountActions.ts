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

const editInfos: RequestHandler = async (req, res, next) => {
  try {
    const accountId = Number(req.params.id);
    const { username, email, password } = req.body;
    const account = await accountRepository.read(accountId);
    if (!account) {
      res.status(404).json({ success: false, message: "Compte non trouvé" });
      return;
    }

    if (!username || !email || !password) {
      res
        .status(400)
        .json({
          success: false,
          message: "Tous les champs doivent être remplis",
        });
      return;
    }

    const affectedRows = await accountRepository.updateInfos({
      id: accountId,
      username,
      email,
      password,
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
      data: { id: accountId, username, email, password },
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
      res
        .status(400)
        .json({
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

const add: RequestHandler = async (req, res, next) => {
  try {
    const newAccount = {
      id: Number(req.params.id),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      teacher_1: req.body.teacher_1 || '',
      teacher_2: req.body.teacher_2 || '',
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

export default { browse, read, editTrainers, editInfos,add, destroy };
