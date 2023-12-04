const User = require('../models/User');

const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      location: req.body.location,
      password: CryptoJS.AES.encrypt(req.body.password, 'rn-e-commerce').toString(),
    });

    try {
      await newUser.save();
      res.status(201).json({ message: 'user successfully created' });
    } catch (e) {
      res.status(500)
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(401).json('wrong credentials provide a valid email');

      const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'rn-e-commerce');
      const decryptedPass = decryptedPassword.toString(CryptoJS.enc.Utf8);

      decryptedPass !== req.body.password && res.status(401).json('wrong password');

      const userToken = JWT.sign(
        { id: user.id },
        'rn-e-commerce',
        { expiresIn: '7d' },
      );

      const { password, __v, createdAt, updatedAt, ...others } = user._doc;

      res.status(200).json({ ...others, token: userToken });
    } catch (e) {
      res.status(500)
    }
  },
};