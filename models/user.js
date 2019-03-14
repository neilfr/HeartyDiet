const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  favoriteFoods: [
    { type: Schema.Types.ObjectId, ref: "Food", quantity: Number }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
