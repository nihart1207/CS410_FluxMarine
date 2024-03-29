const { json } = require('body-parser');
const User = require('../models/users');
const {createTokenForUser} = require('../services/authentication');

// Create a new user
exports.createUser = async (req, res, next) => {
  const {name, email, password, role} = req.body;

  if (!name || !email || !password) return res.status(400).json({message: "missing username/ password"});

  
  const userExists = await User.findOne({email});
  if (userExists) return res.status(409).json({message: "user already exists"});
  

  try {
    const user = new User({ name, email, password, role});
    const token = createTokenForUser(user);
    await user.save();

    return res.status(200).json(user);
    // user created successfully
  } catch (err) {
    return res.status(500).json({ error: err });
    // user already exists
  }
};


// checking login correctly 
exports.checkLogin = async (req, res, next) => {

  const {user} = req.body;
  const {username, password} = req.body;
  if (user) {
    return res.status(403).json({error: "user already loggedin"});
  }
  
  try {
    if (!username || !password) {
      return res.status(400).json({error: "username/ password missing"});
    } 

    const token = await User.matchPasswordAndGenerateToken(username, password); 

    if (!token) return res.status(401).json({message: "Wrong credentials"});
    return res.cookie("token", token).status(200).json({message:"Log in succesful"});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


//deletes a user if the user requesting is an admin and user is not deleting himself
exports.deleteUserById = async (req, res) => {
  const payload = req.user;
  const {_id} = req.params;

  if (!_id) {
    return res.status(400).json({ error: "id to be deleted missing" });
  }

  if (payload && payload.role !== "ADMIN") {
    return res.status(401).json({ error: "user not authorized" });
  }

  try {
    const user = await User.findOne({_id: _id});
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (payload._id === user._id) {
      return res.status(409).json({ error: "User cannot delete self" });
    }

    await User.findOneAndDelete({_id: _id});
    return res.status(200).json({ message: "Successfully deleted user" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


//updates user by email if and only if user requesting is self
//only admin can change the role
//changing token cookie too....
exports.updateUserByEmail = async (req, res) => {
  const payload = req.user;
  const { email } = req.query;
  const { password, role, name } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email to be updated missing" });
  }

  // Check if user has the role of "ADMIN" or if the email in the payload and the email to be changed are different
  const isAllowed = payload.role === "ADMIN" || payload.email === email;
  if (!isAllowed) {
    return res.status(401).json({ error: "User not authorized" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateData = {};

    if (name) updateData.name = name;
    if (password && payload.email === email) {
      await User.changePassword(user.email, password);
    }

    if (role) {
      if (payload.role === "ADMIN") {
        updateData.role = role;
      } else {
        return res.status(401).json({ error: "User not authorized" });
      }
    }

    await User.updateOne({ email: email }, updateData);

    const updatedUser = await User.findOne({email: email});
    const token = createTokenForUser(updatedUser);

    if (payload.email === email) {
      res.cookie('token', token);
      return res.status(200).json({ message: "Updated successfully" });
    } else {
      return res.status(200).json(updatedUser);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
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

