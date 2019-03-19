const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//note that energy and potassium amounts are based on 100g of the food
const FoodSchema = new Schema({
  foodName: { type: String, required: true },
  foodGroupName: { type: String, required: true },
  // note energy is measured in kCal
  energy: { type: Number, required: true },
  // note that potassium is measured in g
  potassium: { type: Number, required: true },
  // userName that created this food.  Master represents the original db.
  // userId: [{ type: Schema.Types.ObjectId, ref: "User" }]
  userName: { type: String, required: true }
});

const Food = mongoose.model("Food", FoodSchema);

FoodSchema.virtual("efficiency").get(function() {
  return parseInt(this.potassium) === 0
    ? 0
    : parseFloat(parseInt(this.energy) / parseInt(this.potassium)).toFixed(2);
});
// .set(function() {
//   this.efficiency = 1000;
//   // parseInt(potassium) === 0 ? 0 : parseInt(energy) / parseInt(potassium);
// });

module.exports = Food;
