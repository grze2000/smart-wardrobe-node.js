const { CLOTHES_TYPES } = require("../enums/clothesTypes");
const { COLORS } = require("../enums/colors");
const { MATERIAL_THICKNESS } = require("../enums/materialThickness");

exports.getColors = (req, res) => {
  res.json(Object.values(COLORS));
}

exports.getMaterialThickness = (req, res) => {
  res.json(Object.values(MATERIAL_THICKNESS));
}

exports.getClothesTypes = (req, res) => {
  res.json(Object.values(CLOTHES_TYPES));
}