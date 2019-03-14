const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeeklyPlanSchema = new Schema({
  //mealName: any friendly string the user wants to use to refer to this collection of foods IE. meal
  weeklyPlanName: { type: String, required: true },
  //mealCategory: any friendly string the user wants to use to categorize a group of meals Ex. breakfast, lunch, dinner, snack
  dailyPlans: {
    Monday: { type: Schema.Types.ObjectId, ref: "DailyPlan" },
    Tuesday: { type: Schema.Types.ObjectId, ref: "DailyPlan" },
    Wednesday: { type: Schema.Types.ObjectId, ref: "DailyPlan" },
    Thursday: { type: Schema.Types.ObjectId, ref: "DailyPlan" },
    Friday: { type: Schema.Types.ObjectId, ref: "DailyPlan" },
    Saturday: { type: Schema.Types.ObjectId, ref: "DailyPlan" },
    Sunday: { type: Schema.Types.ObjectId, ref: "DailyPlan" }
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" }
});

const WeeklyPlan = mongoose.model("WeeklyPlan", WeeklyPlanSchema);

module.exports = WeeklyPlan;
