import type { RequestHandler } from "express";
import accountRepository from "../account/accountRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await accountRepository.readByEmail(req.body.email);

    if (user == null) {
      res.status(404).json({ message: "Email non trouvé" });
    } else if (user.hashed_password !== req.body.hashed_password) {
      res.status(404).json({ message: "Mot de passe incorrect" });
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

export default { login };
