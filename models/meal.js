const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  //mealName: any friendly string the user wants to use to refer to this collection of foods IE. meal
  mealName: { type: String, required: true },
  //mealCategory: any friendly string the user wants to use to categorize a group of meals Ex. breakfast, lunch, dinner, snack
  mealFoods: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food",
      servingSize: { type: Number, required: true }
    }
  ]
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;

// alternative schema... reduces data duplication...
//   but I found it detrimental when trying to build these kinds
//   of relationships between tables when i did the scraper app
/*const mealSchema = new Schema({
  mealName: { type: String, required: true },
  mealCategory: { type: String, required: true },
  mealFoods: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food",
      quantity:Number
    }
  ]
});
*/
