import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Tous les champs doivent être remplis",
      });
      return;
    }

    const affectedRows = await userRepository.update({
      id: userId,
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
      user: {
        id: userId,
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
    const newUser = {
      id: Number(req.params.id),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const insertId = await userRepository.create(newUser);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    await userRepository.delete(userId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
