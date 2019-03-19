const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  // note targetPotassium is measured in mg
  targetPotassium: { type: Number, required: false, default: 0 },
  // note targetEnergy is measured in kCal
  targetEnergy: { type: Number, required: false, default: 0 },

  targetEfficiency: { type: Number, required: false, default: 0 }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
