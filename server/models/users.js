const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const {createTokenForUser} = require('../services/authentication');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  profileImageURL: {
    type: String,
    default: "images/default.png"
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum : ["USER", "ADMIN", "EDITOR"],
    default: "USER"
  }
}, {timestamps: true});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hash = createHmac('sha256', salt)
               .update(user.password)
               .digest('hex');
  this.password = hash;
  this.salt = salt;

  next();
})

userSchema.static("changePassword", async function(email, password) {
    const salt = randomBytes(16).toString();
    const newPassword = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

    try {
      await User.updateOne({email:email}, {password: newPassword});
      await User.updateOne({email:email}, {salt: salt});
    } catch (err) {
      console.log(err);
    }
    
});

userSchema.static("matchPasswordAndGenerateToken", async function(email, password) {
  const user = await this.findOne({email});
  if (!user) return null;

  const salt = user.salt;
  const hashedPassword = user.password;
  const userProvidedPassword = createHmac('sha256', salt)
  .update(password)
  .digest('hex');


  if (hashedPassword === userProvidedPassword) {
    const token = createTokenForUser(user); 
    return token;
  }
  return null;
});

const User = mongoose.model('User', userSchema);

module.exports = User;