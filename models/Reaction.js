const { default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');
const {dateFormat} = require('../utils/helpers');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: mongoose.Types.ObjectId,
      required: true,
      default: new mongoose.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      default: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: dateFormat
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


module.exports = reactionSchema;
