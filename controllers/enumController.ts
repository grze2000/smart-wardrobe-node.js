import { Request, Response } from "express";
import { COLORS } from "../enums/colors";
import { MATERIAL_THICKNESS } from "../enums/materialThickness";
import { CLOTHES_TYPES } from "../enums/clothesTypes";
import { CLOTHES_STATUSES } from "../enums/clothesStatuses";

export const getColors = (req: Request, res: Response) => {
  res.json(Object.values(COLORS));
};

export const getMaterialThickness = (req: Request, res: Response) => {
  res.json(Object.values(MATERIAL_THICKNESS));
};

export const getClothesTypes = (req: Request, res: Response) => {
  res.json(Object.values(CLOTHES_TYPES));
};

export const getClothesStatuses = (req: Request, res: Response) => {
  res.json(Object.values(CLOTHES_STATUSES));
};
