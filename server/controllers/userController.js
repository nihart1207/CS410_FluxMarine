const { json } = require('body-parser');
const User = require('../models/users');
const {createTokenForUser} = require('../services/authentication');

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;
    
    const user = new User({ name, email, password });
    const token = createTokenForUser(user);
    await user.save();
    res.cookie("token", token).status(200).json({message: "successfully user created"});
    // user created successfully
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
    // user already exists
  }
};


// checking login correctly 
exports.checkLogin = async (req, res, next) => {

  const user = req.body;
  if (!user) {
    return res.status(500).json({error: "user details missing"});
  }
  
  try {
    const token = await User.matchPasswordAndGenerateToken(user.username, user.password);
    return res.cookie("token", token).status(200).json({message:"Log in succesful"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


//deletes a user if the user requesting is an admin and user is not deleting himself
exports.deleteUserByEmail = async (req, res, next) => {
  const token = req.cookie.token
  if (user.role != "ADMIN") {
    return res.status(401).json({error: "unauthorized to delete"});
  }
  
  if (user.email === req.params.email) {
    return res.status(409).json({error: "user cannot delete self"});
  }

  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.status(200).json({message : "successfully deleted user"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

//updates user by email if and only if user requesting is self
//only admin can change the role
//changing token cookie too....
exports.updateUserByEmail = async (req, res, next) => {
  try {
    const {role, name, password } = req.body; 
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (role && req.user.role === "ADMIN") user.role = role;
    if (name && req.user.email === req.params.email) user.name = name;
    
    if (password && req.user.email === req.params.email) {
      const result = await User.changePassword(email, password);
      if (result == 0) {
        res.status(404).json({error: "user not found"});
      }
    }
    await user.save();

    if (req.user.email === req.params.email) {
      const token = createTokenForUser(user);
      res.cookie(200).cookie('token', token).json({message : "successfully updated user"});
    }
    res.status(200).json({message: "successfully updated user"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// Update a user by ID //need to check if admin changed this? 
exports.updateUserById = async (req, res, next) => {
  try {
    const {role, name, password } = req.body; 
    const user = await User.findOne({ _id: req.params._id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (role && req.user.role === "ADMIN") user.role = role;
    if (name && req.user.email === user.email) user.name = name;
    
    if (password && req.user.email === user.email) {
      const result = await User.changePassword(email, password);
      if (result == 0) {
        res.status(404).json({error: "user not found"});
      }
    }
    await user.save();

    if (req.user.email === user.email) {
      const token = createTokenForUser(user);
      res.cookie(200).cookie('token', token).json({message : "successfully updated user"});
    }
    res.status(200).json({message: "successfully updated user"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a user by ID // need to remove cookie associated with that ?
exports.deleteUserById = async (req, res, next) => {
  const token = req.cookie.token
  if (user.role != "ADMIN") {
    return res.status(401).json({error: "unauthorized to delete"});
  }
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.email === user.email) {
      return res.status(409).json({error: "user cannot delete self"});
    }
  
    await user.remove();
    res.status(200).json({message : "successfully deleted user"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
