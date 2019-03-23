const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  mealName: { type: String, required: false },
  userName: { type: String, required: false },
  totalEnergy: { type: Number, required: false },
  totalPotassium: { type: Number, required: false },
  foodList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food"
    }
  ]
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
