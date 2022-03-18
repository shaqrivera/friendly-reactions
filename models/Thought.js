const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const {dateFormat} = require('../utils/helpers');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: dateFormat
    },
    username: {
      type: String,
      required: true,
    },
    userId:{
      type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount')
.get(
  function () {
    return this.reactions.length
  }
)

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
