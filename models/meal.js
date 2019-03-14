const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  //mealName: any friendly string the user wants to use to refer to this collection of foods IE. meal
  name: { type: String, required: true },
  //mealCategory: any friendly string the user wants to use to categorize a group of meals Ex. breakfast, lunch, dinner, snack
  foods: [
    {
      foodId: { type: Schema.Types.ObjectId, ref: "Food" },
      servingSize: { type: Number, required: true }
    }
  ],
  userId: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
