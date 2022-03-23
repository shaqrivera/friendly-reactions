const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate(['thoughts','friends'])
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : User.deleteMany({ _id: { $in: Thought.userId } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

// Add a friend
addFriend (req, res) {
  User.updateOne(
    { _id: req.params.friendId },
    { $addToSet: { friends: req.params.userId } },
  ).then(
    (user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : User.updateOne(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    {new: true}
  )
  .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err))
  )
  
},
removeFriend (req, res) {
  User.updateOne(
    { _id: req.params.friendId },
    { $pull: { friends: req.params.userId } },
  ).then(
    (user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : User.updateOne(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    {new: true}
  )
  .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err))
  )
}
};
