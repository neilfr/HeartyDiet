const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  favoriteFoods: [
    { type: Schema.Types.ObjectId, ref: "Food", quantity: Number }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
