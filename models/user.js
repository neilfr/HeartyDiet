const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: String,
    default: ''
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  // note targetPotassium is measured in mg
  targetPotassium: { 
    type: Number, 
    required: false, 
    default: 0
  },
  // note targetEnergy is measured in kCal
  targetEnergy: { 
    type: Number,
    required: false,
    default: 0
  },
  targetEfficiency: { 
    type: Number, 
    required: false, 
    default: 0
  }
});


const User = mongoose.model("User", UserSchema);

User.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


User.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = User;
