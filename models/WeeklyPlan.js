const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeeklyPlanSchema = new Schema({
  //mealName: any friendly string the user wants to use to refer to this collection of foods IE. meal
  weeklyPlanName: { type: String, required: true },
  //mealCategory: any friendly string the user wants to use to categorize a group of meals Ex. breakfast, lunch, dinner, snack
  dailyPlans: [
    {
      type: Schema.Types.ObjectId,
      ref: "DailyPlan"
    }
  ]
});

const WeeklyPlan = mongoose.model("WeeklyPlan", WeeklyPlanSchema);

module.exports = WeeklyPlan;
