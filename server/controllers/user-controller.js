const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  // Create a user
  async createUser( req, res ) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);

      const userToInsert = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: password,
      };
      
      const user = await User.create(userToInsert);
      
      if (!user) {
        res.status(400).json({ message: 'Unable to create user' });
      }
      
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a user
  async removeUser( req, res ) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
      }

      res.status(200).json({ message: 'User successfully deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser( req, res ) {
    try {
      const userToUpdate = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
      };

      if (req.body.password?.length) {
        const password = await bcrypt.hash(req.body.password, 10);
        userToUpdate = { ...userToUpdate, password: password };
      }

      const user = await User.findOneAndUpdate({ _id: req.params.id }, userToUpdate, { new: true });

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get all users
  async getAllUsers( req, res ) {
    try {
      const users = await User.find({}).populate({ path: 'posts', populate: { path: 'comments' } });

      if (!users) {
        res.status(404).json({ message: 'No users found' });
      } else {
        res.status(200).json(users);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser( req, res ) {
    try {
      const user = await User.findOne({ _id: req.params.id })
      // .populate({
      //   path: 'posts',
      //   populate: { path: 'comments' },
      // },
      // {
      //   path: 'likes',
      // },
      // {
      //   path: 'comments',
      // },
      // {
      //   path: 'following',
      // },
      // {
      //   path: 'followers',
      // }
      // );

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
      }

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Authorize the user
  async authorizeUser( req, res ) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        res.status(400).json({ message: 'No user found with this email address' });
      }

      const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

      if (!passwordIsValid) {
        res.status(401).json({ message: 'Incorrect password' });
      }

      const token = jwt.sign({
        email: user.email,
        id: user._id,
      }, process.env.JWT_SECRET);
      

      res.header('auth-token', token).json({ error: null, data: { user, token } });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Verify the user
  async verifyUser( req, res ) {
    try {
      const token = req.headers['auth-token'];

      if (!token) {
        res.status(401).json({ message: 'No token provided' });
      }

      const isVerified = jwt.verify(token, process.env.JWT_SECRET);

      if (!isVerified) {
        res.status(401).json({ message: 'Token is not valid' });
      }

      const user = await User.findById(isVerified.id);
      
      if (!user) {
        res.status(404).json({ message: 'No user found' });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}