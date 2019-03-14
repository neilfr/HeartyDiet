const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyPlanSchema = new Schema({
  //mealName: any friendly string the user wants to use to refer to this collection of foods IE. meal
  dailyPlanName: { type: String, required: true },
  //mealCategory: any friendly string the user wants to use to categorize a group of meals Ex. breakfast, lunch, dinner, snack
  dailyPlanMeals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meal"
    }
  ]
});

const DailyPlan = mongoose.model("DailyPlan", DailyPlanSchema);

module.exports = DailyPlan;
