const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//note that energy and potassium amounts are based on 100g of the food
const FoodSchema = new Schema({
  foodName: { type: String, required: true },
  foodGroup: { type: String, required: true },
  // note energy is measured in kCal
  energy: { type: Number, required: true },
  // note that potassium is measured in g
  potassium: { type: Number, required: true },
  // userName that created this food.  Master represents the original db.
  userName: { type: Schema.Types.ObjectId, ref: "User" }
});

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
