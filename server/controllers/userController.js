const { json } = require('body-parser');
const User = require('../models/users');
const {createTokenForUser} = require('../services/authentication');

// Create a new user
exports.createUser = async (req, res, next) => {
  const {name, email, password} = req.body;

  if (!name || !email || !password) return res.status(400).json({message: "missing username/ password"});

  
  const userExists = await User.findOne({email});
  console.log(userExists);
  if (userExists) return res.status(409).json({message: "user already exists"});
  

  try {
    const user = new User({ name, email, password });
    const token = createTokenForUser(user);
    await user.save();

    return res.cookie("token", token).status(200).json({message: "successfully user created"});
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
    res.status(403).json({error: "user already loggedin"});
  }
  
  try {
    if (!username || !password) {
      res.status(400).json({error: "username/ password missing"});
    } 

    const token = await User.matchPasswordAndGenerateToken(username, password); 

    if (!token) res.status(401).json({message: "Wrong credentials"})
    
    res.cookie("token", token).status(200).json({message:"Log in succesful"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


//deletes a user if the user requesting is an admin and user is not deleting himself
exports.deleteUserByIdOrEmail = async (req, res, next) => {
  const payload = req.user;
  const {email} = req.query;

  if (!email) {
    return res.status(400).json({ error: "id or email to be deleted not provided" });
  }

  if (!payload) {
    return res.status(401).json({ error: "user not authorized" });
  }

  if (payload && payload.role !== "ADMIN") {
    return res.status(401).json({ error: "user not authorized" });
  }

  try {
    const user = await User.findOne({email: email});
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (payload.email === user.email) {
      return res.status(409).json({ error: "User cannot delete self" });
    }

    return res.status(200).json({ message: "Successfully deleted user" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


//updates user by email if and only if user requesting is self
//only admin can change the role
//changing token cookie too....
exports.updateUserByIdOrEmail = async (req, res, next) => {
  try {
    const {role, name, password } = req.user; 
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

