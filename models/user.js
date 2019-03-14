const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  favoriteFoods: [
    {
      foodName: { type: String, required: true },
      foodGroup: { type: String, required: true },
      energy: { type: String, required: true },
      potassium: { type: String, required: true }
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
