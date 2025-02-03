import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
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

      // Token generation code will be added here
      const myPayload: MyPayload = {
        sub: user.id.toString(),
        isAdmin: user.is_admin,
      };

      const token = await jwt.sign(
        myPayload,
        process.env.APP_SECRET as string,
        { expiresIn: "1h" },
      );

      // Send the token in the response header
      res.setHeader("Authorization", `Bearer ${token}`);

      // Send the user's information in the response body
      res.json(userWithoutHashedPassword);
    } else {
      res.status(422).json({ message: "Incorrect password." });
    }
  } catch (err) {
    next(err);
  }
};

const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    // Verify there is a Header in the request
    const autohorizationHeader = req.get("Authorization");

    if (autohorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    // Verify the type is"Bearer <token>"
    const [type, token] = autohorizationHeader.split("");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    // Verify the validity of the token
    req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;

    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
};

export default { login };
