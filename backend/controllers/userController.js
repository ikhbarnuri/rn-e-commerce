const User = require('../models/User');

module.exports = {
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json('user successfully deleted');
    } catch (e) {
      res.status(500);
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) return res.status(401).json('user does not exist');
      const { password, __v, createdAt, updatedAt, ...others } = user._doc;

      res.status(200).json(others);
    } catch (e) {
      res.status(500);
    }
  },
};