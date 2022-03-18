const { Schema, model } = require('mongoose');
const {isEmail} = require('validator');
const {thoughtSchema} = require('./Thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
      unique: true,
      validate: [isEmail, 'Invalid email!']
    },
    thoughts: [thoughtSchema],
    friends: [this],
  },
  {
    toJSON: {
      virtuals: true
    },
  }
);

userSchema.virtual('friendCount')
.get(
  function () {
    return this.friends.length
  }
)

const User = model('user', userSchema);

module.exports = User;
