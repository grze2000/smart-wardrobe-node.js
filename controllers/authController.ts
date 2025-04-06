import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User, { IUser, IUserMethods } from "../models/User";
import RefreshToken, { IRefreshToken } from "../models/RefreshToken";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface TokenPayload {
  id: Types.ObjectId;
}

export const login = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  User.findOne(
    { username: req.body.username },
    (err: Error, user: IUser & IUserMethods) => {
      if (err) {
        res.status(500).json({ message: "Database error" });
        return;
      }
      if (!user) {
        res.status(400).json({ message: "Incorrect username or password" });
        return;
      }
      user.comparePassword(
        req.body.password,
        (err: Error | null, isMatch: boolean | undefined) => {
          if (!err && isMatch) {
            const expirationDate = new Date(
              Date.now() + 1000 * 60 * 60 * 24 * 30
            );
            const accessToken = jwt.sign(
              {
                id: user._id,
              },
              process.env.SECRET as string,
              {
                expiresIn: 60 * 15,
              }
            );

            const refreshToken = jwt.sign(
              {
                id: user._id,
              },
              process.env.REFRESH_TOKEN_SECRET as string,
              {
                expiresIn: 60 * 60 * 24 * 30,
              }
            );

            const newRefreshToken = new RefreshToken({
              token: refreshToken,
              expireAt: expirationDate,
            });

            newRefreshToken.save((err) => {
              if (err) {
                res.status(500).json({ message: "Database error" });
              } else {
                res.json({
                  accessToken,
                  refreshToken,
                  userId: user._id,
                  email: user.email,
                });
              }
            });
          } else {
            res.status(400).json({ message: "Incorrect username or password" });
          }
        }
      );
    }
  );
};

export const register = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { username, email, password } = req.body;

  User.findOne(
    {
      $or: [{ username }, { email }],
    },
    (err: Error, user: IUser) => {
      if (err) {
        res.status(500).json({ message: "Database error" });
        return;
      }
      if (user) {
        res
          .status(400)
          .json({ message: "User with this username or email already exists" });
        return;
      }
      User.create({
        username,
        email,
        password,
      })
        .then(() => {
          res.status(201).json({ message: "Account has been created!" });
          return;
        })
        .catch(() => {
          res.status(500).json({ message: "Database error" });
          return;
        });
    }
  );
};

export const refreshToken = (req: Request, res: Response) => {
  RefreshToken.findOne(
    { token: req.body.token },
    (err: Error, token: IRefreshToken) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      if (!token) {
        return res.status(400).json({ message: "Nieprawidłowy token" });
      }

      try {
        const user = jwt.verify(
          req.body.token,
          process.env.REFRESH_TOKEN_SECRET || "refresh_secret"
        ) as TokenPayload;

        if (!user) {
          return res.status(400).json({ message: "Nieprawidłowy token" });
        }

        const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        const accessToken = jwt.sign(
          {
            id: user.id,
          },
          process.env.SECRET || "secret",
          {
            expiresIn: 60 * 60,
          }
        );
        const refreshToken = jwt.sign(
          {
            id: user.id,
          },
          process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
          {
            expiresIn: 60 * 60 * 24 * 30,
          }
        );

        token.token = refreshToken;
        token.expireAt = expirationDate;
        token.save((err) => {
          if (err) {
            return res.status(500).json({ message: "Database error" });
          }
          res.json({
            accessToken,
            refreshToken,
          });
        });
      } catch {
        return res.status(400).json({ message: "Nieprawidłowy token" });
      }
    }
  );
};

export const revokeToken = (req: Request, res: Response) => {
  RefreshToken.findOneAndDelete(
    { token: req.body.token },
    (err: Error, token: IRefreshToken) => {
      if (err || !token) {
        res.status(400).json({ message: "Invalid token" });
      } else {
        res.sendStatus(200);
      }
    }
  );
};
