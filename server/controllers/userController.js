const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const result = await User.createUser(req.body);
    res.status(201).json({ message: 'User created', result });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};
