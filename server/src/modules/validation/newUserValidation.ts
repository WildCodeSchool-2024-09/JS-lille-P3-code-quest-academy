import type { RequestHandler } from "express";
import Joi from "joi";

const newUserSchema = Joi.object({
  username: Joi.string().min(4).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const validateNewUser: RequestHandler = (req, res, next) => {
  const { error } = newUserSchema.validate(req.body, { abortEarly: false });

  if (error == null) {
    next();
  } else {
    res.status(400).json({ ValidationErrors: error.details });
  }
};

export default { validateNewUser };
