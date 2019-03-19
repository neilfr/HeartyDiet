const mongoose = require("mongoose");
require('mongoose-type-url');
const Schema = mongoose.Schema;

//note that energy and potassium amounts are based on 100g of the food
const FoodGroupSchema = new Schema({
  foodGroupName: { type: String, required: true },
  // userName that created this food.  Master represents the original db.
  // userId: [{ type: Schema.Types.ObjectId, ref: "User" }]
  userName: { type: String, required: true },
  image: { type: mongoose.SchemaTypes.Url }
});

const FoodGroup = mongoose.model("FoodGroup", FoodGroupSchema);

module.exports = FoodGroup;
