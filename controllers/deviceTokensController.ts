import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User.js";

export const getDeviceTokens = (req: Request, res: Response) => {
  const user = req.user as IUser;
  res.json(user.deviceTokens);
};

export const createDeviceToken = (req: Request, res: Response) => {
  const user = req.user as IUser;
  const deviceToken = jwt.sign(
    {
      id: user._id,
      name: req.body?.name,
    },
    process.env.DEVICE_TOKEN_SECRET as string
  );
  user.deviceTokens.push({ token: deviceToken, name: req.body?.name } as any);
  user.save((err) => {
    if (err) {
      res.status(500).json({ message: "Database error" });
    } else {
      res
        .status(201)
        .json(
          user.deviceTokens?.length
            ? user.deviceTokens[user.deviceTokens.length - 1]
            : null
        );
    }
  });
};

export const deleteDeviceToken = (req: Request, res: Response) => {
  const user = req.user as IUser;
  user.deviceTokens = user.deviceTokens.filter(
    (token) => token._id.toString() === req.params.id
  );
  user.save((err) => {
    if (err) {
      res.status(500).json({ message: "Database error" });
    } else {
      res.sendStatus(200);
    }
  });
};
