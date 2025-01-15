import type { RequestHandler } from "express";
import loginRepository from "./loginRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginRepository.getUser(email, password);

    if (user.email !== req.body.email) {
      res.status(404).json({ message: "Email non trouvé" });
    } else if (user.password !== req.body.password) {
      res.status(404).json({ message: "Mot de passe incorrect" });
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

export default { login };
