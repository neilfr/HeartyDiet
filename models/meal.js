const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  //mealName: any friendly string the user wants to use to refer to this collection of foods IE. meal
  mealName: { type: String, required: true },
  //mealCategory: any friendly string the user wants to use to categorize a group of meals Ex. breakfast, lunch, dinner, snack
  mealCategory: { type: String, required: true },
  //mealFoods: the collection of foods that make up the meal
  mealFoods: [
    {
      foodName: { type: String, required: true },
      foodGroup: { type: String, required: true },
      energy: { type: Number, required: true },
      potassium: { type: Number, required: true },
      //servingSize: in units of 100g, as nutrient values per food all assume 100g serving size.
      //Need to multiply energy and potassium by this number when displaying or calculating
      //  total energy and total potassium for the selected serving size.
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
