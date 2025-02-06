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
        { expiresIn: "24h" },
      );

      // Send the token in the Authorization Header
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
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }

    // Verify the type is "Bearer <token>"
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      res.status(401).json({ message: "Invalide authorization header" });
    }

    // Verify the validity of the token
    try {
      req.auth = jwt.verify(
        token,
        process.env.APP_SECRET as string,
      ) as MyPayload;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
    
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
};

const loginByToken: RequestHandler = async (req, res, next) => {
  try {
    // userId in the Payload is a string, so we need to convert it to a number
    const userId = Number(req.auth?.sub);

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    // Get user info from DB
    const user = await accountRepository.readById(userId);

    if (!user) {
      res.sendStatus(401);
      return;
    }

    const { hashed_password, ...userWithoutHashedPassword } = user;
    res.json(userWithoutHashedPassword);
  } catch (error) {
    res.sendStatus(500);
  }
};

export default { login, loginByToken, verifyToken };
