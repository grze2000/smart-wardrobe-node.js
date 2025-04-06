import { Request, Response } from "express";
import { IUser } from "../models/User";
import { matchedData, validationResult } from "express-validator";
import { IClothes } from "../models/Clothes";

export const getClothes = (req: Request, res: Response) => {
  const user = req.user as IUser;
  res.json(user.clothes);
};

export const addClothes = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const data = matchedData(req) as IClothes;
  const user = req.user as IUser;
  user.clothes.push(data);
  user.save((err) => {
    if (err) {
      res.status(500).json({ message: "Database error" });
    } else {
      res.sendStatus(201);
    }
  });
};
