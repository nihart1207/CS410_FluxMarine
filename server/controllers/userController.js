const User = require('../models/users');

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;
    
    const user = new User({ name, email, password });
    await user.save();
    res.status(200);
    // user created successfully
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
    // user already exists
  }
};

exports.checkLogin = async (req, res, next) => {

  const user = req.body;
  if (!user) {
    return res.status(500).json({error: "user details missing"});
  }
  
  try {
    const resultFromDB = await User.matchPassword(user.username, user.password);
    if (resultFromDB === "Correct") {
      return res.status(200).json({message: "login successful"});
    } else if (resultFromDB == "Wrong") {
      return res.status(500).json({error: "wrong password"});
    } else {
      return res.status(500).json({error: "user not found"});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

exports.getUserByEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, { name, email, password }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
