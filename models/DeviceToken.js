const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: null,
  }
}, {timestamps: true});

module.exports = deviceTokenSchema;