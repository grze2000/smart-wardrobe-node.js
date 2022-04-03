const mongoose = require('mongoose');
const { CLOTHES_TYPES } = require('../enums/clothesTypes');
const { COLORS } = require('../enums/colors');
const { MATERIAL_THICKNESS } = require('../enums/materialThickness');
const Schema = mongoose.Schema;

const clothesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    required: true,
    enum: Object.values(CLOTHES_TYPES),
  },
  materialThickness: {
    type: String,
    required: true,
    enum: Object.values(MATERIAL_THICKNESS),
  },
  colors: [{
    type: String,
    enum: Object.values(COLORS),
  }],
  inWash: {
    type: Boolean,
    default: false,
  },
  inWardrobe: {
    type: Boolean,
    required: true,
    default: true,
  },
  purchaseDate: Date,
  value: {
    type: Number,
    min: 0,
  },
  tagId: String,
}, {timestamps: true});

module.exports = clothesSchema;