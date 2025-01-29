import argon2 from "argon2";
import type { RequestHandler } from "express";
import accountRepository from "../account/accountRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    // Retrieve the user by their email address
    const user = await accountRepository.readByEmail(req.body.email);

    // Check if the user exists in the database
    if (user == null) {
      res.status(422).json({ message: "Unknown email address." });
      return;
    }

    // Verify the password
    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password,
    );

    // If the password is correct, return the user's information
    if (verified) {
      // Destructure `user` using the spread operator to return all properties except `hashed_password`
      const { hashed_password, ...userWithoutHashedPassword } = user;

      res.json({ message: "Login successful", userWithoutHashedPassword });
    } else {
      res.status(422).json({ message: "Incorrect password." });
    }
  } catch (err) {
    next(err);
  }
};

export default { login };
